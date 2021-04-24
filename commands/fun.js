module.exports = {
    name: "sanatize",
    minArgs: 0,
    maxArgs: 0,
    async execute(message, args, client) {
      message.channel
        .send("Starting sanitization process <:mask:803972838515539968>")
        .then((msg) => {
          setTimeout(() => {
            msg.edit("Disinfecting the channel 🧼🧴");
          }, 3000);
          setTimeout(() => {
            msg.edit("Cleaning pfps 🧼🧴");
          }, 6000);
          setTimeout(() => {
            msg.edit("Sanitizing words 🧼📝");
          }, 9000);
          setTimeout(() => {
            msg.edit("Killing all germs 🦠🔫");
          }, 12000);
          setTimeout(() => {
            msg.edit("This channel is sanitized! \nHave a nice day!");
          }, 15000);
        });
    },
  };