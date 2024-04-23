import { useEventCallback } from 'rxjs-hooks/src'
import { useMount } from 'ahooks'
import { filter, map } from 'rxjs'
import { APP_LIST } from '../../../main/channel'

export const AppList = () => {
  const [clickCallback, [description, x, y]] = useEventCallback(
    (event$) => event$.pipe(map((event) => [event.target.innerHTML, event.clientX, event.clientY])),
    ['nothing', 0, 0]
  )
  const [onMessage, [appList]] = useEventCallback((eventSource$, state$) => {
    // console.log(eventSource$, state$)
    return eventSource$.pipe(
      filter((event) => {
        console.log(event)
        return true
      }),
      map((event) => event.data)
    )
  }, [])
  useMount(() => {
    window.electron.ipcRenderer.on('app-list', onMessage)
  })
  return (
    <div>
      <h1
        onClick={() => {
          window.electron.ipcRenderer.invoke(APP_LIST).then((resolve, reject) => {
            console.log('app-list')
            console.log(resolve)
          })
        }}
      >
        AppList
      </h1>
      {/*{appList}*/}
    </div>
  )
}
