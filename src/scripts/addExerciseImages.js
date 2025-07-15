/* eslint-disable @typescript-eslint/no-require-imports */
const { dbConnect, Exercise, getRepoPath } = require('./exerciseScriptUtil')
const fs = require('fs/promises')
const pathModule = require('path')

const staticImagePath = 'images/exercises'

const run = async () => {
  await dbConnect()
  const exercises = await Exercise.find()

  const errors = []

  await fs.rm(
    pathModule.join(__dirname, '../../public', staticImagePath),
    { recursive: true, force: true }
  )

  for (const ex of exercises) {
    try {
      for (const path of ex.images) {
        const sourcePath = getRepoPath('exercises', path)
        const staticPath = pathModule.join(__dirname, '../../public', staticImagePath, path)
        await fs.mkdir(pathModule.dirname(staticPath), { recursive: true })
        await fs.copyFile(sourcePath, staticPath)
      }

      ex.images = (ex.images || []).map(path => `/${staticImagePath}/${path}`)
      await ex.save()
      console.log(`Updated exercise with jsonId: ${ex.jsonId}`)
    }
    catch (error) {
      errors.push({
        exercise: ex,
        error: error?.message ?? error?.toString() ?? `${error}`,
      })
    }
  }

  for (const { error, exercise } of errors) {
    console.log(error)
    console.log(exercise)
  }
}

run()
  .catch(e => {
    console.error(e)
    process.exitCode = 1
  })
  .then(() => process.exit())
