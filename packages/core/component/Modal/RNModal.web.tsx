import React, { FC, useEffect, useState, useCallback, useRef } from "react"
import { createPortal } from "react-dom"
import { StyleSheet, ModalProps } from "react-native"

const noop: any = () => {}

type State = {
  el: any
  target: HTMLElement | null
}

const Portal: FC = ({ children }) => {
  const [state, setState] = useState<State>({ el: null, target: null })
  useEffect(() => {
    setState({
      ...state,
      el: document.createElement("div"),
      target: document.body,
    })

    return () => {
      state.target && state.target.removeChild(state.el)
    }
  }, [])

  useEffect(() => {
    if (state.target) state.target.appendChild(state.el)
  }, [state.target])

  return state.el ? createPortal(children, state.el) : null
}

export const RNModal: FC<ModalProps> = ({
  visible = false,
  onShow = noop,
  onDismiss = noop,
  children,
}) => {
  const wasVisible = useRef<boolean | undefined>()
  const [isRender, setRender] = useState(false)

  const onClose = useCallback(() => {
    if (visible) {
      if (onShow) {
        onShow()
      }
    } else {
      setRender(false)
      if (onDismiss) {
        onDismiss()
      }
    }
  }, [onDismiss, onShow, visible])

  useEffect(() => {
    if (visible) {
      setRender(true)
    }

    if (visible !== wasVisible.current) {
      onClose()
    }

    wasVisible.current = visible
  }, [visible, onClose])

  return (
    <Portal>
      <div
        onAnimationEnd={onClose}
        style={StyleSheet.flatten([
          styles.baseStyle,
          styles[isRender ? "visible" : "hidden"],
        ])}
      >
        {children}
      </div>
    </Portal>
  )
}

const styles: any = StyleSheet.create({
  baseStyle: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 9999,
  },
  bgTransparent: {
    backgroundColor: "transparent",
  },
  bgNotTransparent: {
    backgroundColor: "#ffffff",
  },
  hidden: {
    display: "none",
  },
  visible: {
    display: "flex",
  },
} as any)
