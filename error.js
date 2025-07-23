setTimeout(() => {
    throw new Error("oops");
}, 300)


process.on('uncaughtException', () => {

})

process.on('unhandledRejection', () => {

})


// app.get("/", () => {
//     throw new Error("oops");
//   });

//   app.use((err, req, res, next) => {
//     // handle error
//   });

//   const handler = async (req, res, next) = {
//     // ....
//     try {
//       const user = await prisma.user.create({})
//     } catch(e) {
//       next(e)
//     }
//   }