/* eslint-disable @typescript-eslint/no-require-imports */
const { fetchExerciseJson, dbConnect, Exercise } = require('./exerciseScriptUtil')

const run = async () => {
  await dbConnect()
  const exercises = await fetchExerciseJson()

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
    catch (e) {
      console.error(e)
      console.log(ex)
    }
  }
}

run()
  .catch(e => {
    console.error(e)
    process.exitCode = 1
  })
  .then(() => process.exit())
