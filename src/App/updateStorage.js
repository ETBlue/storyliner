import {SETTINGS} from '../_shared'

export default ({title, subtitle, storage, source}) => {
  const history = JSON.parse(storage.getItem(SETTINGS.title))
  history[source] = {
    title: title,
    subtitle: subtitle,
    time: Date.now()
  }
  for (const entry in history) {
    if (!entry.match(/^http/) || history[entry].title.includes('<!DOCTYPE html>')
    ) {
      delete history[entry]
    }
  }
  storage.setItem(SETTINGS.title, JSON.stringify(history))
}
