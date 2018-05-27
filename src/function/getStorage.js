import settings from '../settings'

const storage = window.localStorage
if (!storage.getItem(settings.title)) {
  storage.setItem(settings.title, JSON.stringify({}))
}

export default window.localStorage
