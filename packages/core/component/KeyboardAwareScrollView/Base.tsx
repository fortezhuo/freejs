import { Component } from "react"

import {
  DeviceEventEmitter,
  Keyboard,
  NativeModules,
  findNodeHandle,
} from "react-native"

const ScrollViewManager = NativeModules.ScrollViewManager

export class Base extends Component<any, any> {
  keyboardEventListeners: any
  _keyboardAwareView: any
  constructor(props: any) {
    super(props)
    this._bind(
      "_onKeyboardWillShow",
      "_onKeyboardWillHide",
      "_addKeyboardEventListeners",
      "_removeKeyboardListeners",
      "_scrollToFocusedTextInput",
      "_onKeyboardAwareViewLayout",
      "scrollToBottom",
      "scrollBottomOnNextSizeChange"
    )
    this.state = { keyboardHeight: 0 }
    this._addKeyboardEventListeners()
  }

  _bind(...methods: any) {
    methods.forEach((method: any) => {
      ;(this as any)[method] = (this as any)[method].bind(this)
    })
  }

  _addKeyboardEventListeners() {
    let KeyboardEventsObj = Keyboard || DeviceEventEmitter
    this.keyboardEventListeners = [
      KeyboardEventsObj.addListener(
        "keyboardWillShow",
        this._onKeyboardWillShow
      ),
      KeyboardEventsObj.addListener(
        "keyboardWillHide",
        this._onKeyboardWillHide
      ),
    ]
  }

  _removeKeyboardListeners() {
    this.keyboardEventListeners.forEach((eventListener: any) =>
      eventListener.remove()
    )
  }

  componentDidMount() {
    if (this._keyboardAwareView && this.props.startScrolledToBottom) {
      this.scrollToBottom(false)
      setTimeout(
        () => this._keyboardAwareView.setNativeProps({ opacity: 1 }),
        100
      )
    }
  }

  _onKeyboardAwareViewLayout(layout: any) {
    this._keyboardAwareView.layout = layout
    this._keyboardAwareView.contentOffset = { x: 0, y: 0 }
    this._updateKeyboardAwareViewContentSize()
  }

  _onKeyboardAwareViewScroll(contentOffset: any) {
    this._keyboardAwareView.contentOffset = contentOffset
    this._updateKeyboardAwareViewContentSize()
  }

  _updateKeyboardAwareViewContentSize() {
    if (ScrollViewManager && ScrollViewManager.getContentSize) {
      ScrollViewManager.getContentSize(
        findNodeHandle(this._keyboardAwareView),
        (res: any) => {
          if (this._keyboardAwareView) {
            this._keyboardAwareView.contentSize = res
            if (this.state.scrollBottomOnNextSizeChange) {
              this.scrollToBottom()
              this.setState({ scrollBottomOnNextSizeChange: false })
            }
          }
        }
      )
    }
  }

  componentWillUnmount() {
    this._removeKeyboardListeners()
  }

  _scrollToFocusedTextInput() {
    if (this.props.getTextInputRefs) {
      const textInputRefs = this.props.getTextInputRefs()
      textInputRefs.some((textInputRef: any, index: any, array: any) => {
        const isFocusedFunc = textInputRef.isFocused()
        const isFocused =
          isFocusedFunc && typeof isFocusedFunc === "function"
            ? isFocusedFunc()
            : isFocusedFunc
        if (isFocused) {
          setTimeout(() => {
            this._keyboardAwareView
              .getScrollResponder()
              .scrollResponderScrollNativeHandleToKeyboard(
                findNodeHandle(textInputRef),
                this.props.scrollToInputAdditionalOffset,
                true
              )
          }, 0)
        }
        return isFocused
      })
    }
  }

  _onKeyboardWillShow(event: any) {
    this._scrollToFocusedTextInput()

    const newKeyboardHeight = event.endCoordinates.height
    if (this.state.keyboardHeight === newKeyboardHeight) {
      return
    }

    this.setState({ keyboardHeight: newKeyboardHeight })

    if (this.props.scrollToBottomOnKBShow) {
      this.scrollToBottom()
    }
  }

  _onKeyboardWillHide(event: any) {
    const keyboardHeight = this.state.keyboardHeight
    this.setState({ keyboardHeight: 0 })

    const hasYOffset =
      this._keyboardAwareView &&
      this._keyboardAwareView.contentOffset &&
      this._keyboardAwareView.contentOffset.y !== undefined
    const yOffset = hasYOffset
      ? Math.max(this._keyboardAwareView.contentOffset.y - keyboardHeight, 0)
      : 0
    this._keyboardAwareView.scrollTo({ x: 0, y: yOffset, animated: true })
  }

  scrollBottomOnNextSizeChange() {
    this.setState({ scrollBottomOnNextSizeChange: true })
  }

  scrollToBottom(scrollAnimated = true) {
    if (this._keyboardAwareView) {
      if (!this._keyboardAwareView.contentSize) {
        setTimeout(() => this.scrollToBottom(scrollAnimated), 50)
        return
      }

      const bottomYOffset =
        this._keyboardAwareView.contentSize.height -
        this._keyboardAwareView.layout.height +
        this._keyboardAwareView.props.contentInset.bottom
      this._keyboardAwareView.scrollTo({
        x: 0,
        y: bottomYOffset,
        animated: scrollAnimated,
      })
    }
  }
  scrollTo(options: any) {
    if (this._keyboardAwareView) this._keyboardAwareView.scrollTo(options)
  }
}
