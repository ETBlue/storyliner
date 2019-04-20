import SETTINGS from './SETTINGS'

const storage = window.localStorage
if (!storage.getItem(SETTINGS.title)) {
  storage.setItem(SETTINGS.title, JSON.stringify({}))
}

export default storage
