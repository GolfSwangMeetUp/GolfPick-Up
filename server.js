const app = require("./app");

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server listening on port http://localhost:${PORT}`);


  app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });

// app.listen(process.env.PORT || 3000, function () {
//   console.log(
//     "Express server listening on port %d in %s mode",
//     this.address().port,
//     app.settings.env
//   );
// });
