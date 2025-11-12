import { createMigrate } from 'redux-persist'

const migrations = {}

export default createMigrate(migrations, { debug: false })
