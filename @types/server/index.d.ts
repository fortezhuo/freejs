type GetFSOptions = (
  isProd?: boolean
) => {
  [key: string]: any
}

type LoadBanner = (isProd?: boolean) => void
type Boot = () => Promise<void>
