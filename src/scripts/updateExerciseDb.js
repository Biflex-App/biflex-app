/* eslint-disable @typescript-eslint/no-require-imports */
const { dbConnect, Exercise, getRepoPath } = require('./exerciseScriptUtil')
const fs = require('fs/promises')

const run = async () => {
  await dbConnect()
  const exercisesRaw = await fs.readFile(getRepoPath('dist', 'exercises.json'), { encoding: 'utf8' })
  const exercises = JSON.parse(exercisesRaw)

  const errors = []
  for (const ex of exercises) {
    const jsonId = ex.id
    const updateData = { ...ex, id: undefined, jsonId }
    delete updateData._id
    delete updateData.id

    updateData.instructions = (updateData.instructions || []).filter(instr => !!instr && instr.trim() !== '')
    try {
      const existing = await Exercise.findOne({ jsonId })
      if (!existing) {
        await Exercise.create(updateData)
        console.log(`Created exercise with jsonId: ${jsonId}`)
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, jsonId, ...rest } = updateData
        await Exercise.updateOne({ jsonId }, { $set: rest }, { runValidators: true })
        console.log(`Updated exercise with jsonId: ${jsonId}`)
      }
    }
    catch (error) {
      errors.push({
        exercise: ex,
        error: error?.message ?? error?.toString() ?? `${error}`,
      })
    }

    for (const { error, exercise } of errors) {
      console.log(error)
      console.log(exercise)
    }
  }
}

run()
  .catch(e => {
    console.error(e)
    process.exitCode = 1
  })
  .then(() => process.exit())
