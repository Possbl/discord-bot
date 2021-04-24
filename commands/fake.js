const faker = require('faker');

module.exports = {
    name: 'fakeprofile',
    description: 'boosted help',
    execute(message, args, Discord, client) {

        var randomGender = faker.name.gender(); // Caitlyn Kerluke
        var randomName = faker.name.findName(); // Caitlyn Kerluke
        var randomSuffix = faker.name.suffix();
        var randomMusic = faker.music.genre();
        var randomPicture = faker.internet.avatar();
        var randomStreet = faker.address.streetName();
        var randomCity = faker.address.city();
        var randomeState = faker.address.state();
        //var randomePost = faker.address.zipCodeByState();
        var randomIpv4 = faker.internet.ip();
        var randomIpv6 = faker.internet.ipv6(); // Rusty@arne.info
        var randomUser = faker.internet.userName();
        var randomPass = faker.internet.password();
        var randomCell = faker.phone.phoneNumber();
        var randomCCnumber = faker.finance.creditCardNumber();
        var randomCVV = faker.finance.creditCardCVV();
        var randomIban = faker.finance.iban();
        var randombic = faker.finance.bic();
        var randomJobType = faker.name.jobType();
        var randomJobArea = faker.name.jobArea();
        var randomUserAgent = faker.internet.userAgent();
        var randomCar = faker.vehicle.vehicle();

            const newEmbed = new Discord.MessageEmbed()
        
            .setColor('#b434eb')
            .setTitle(`**Fake Profile**`)
            .setThumbnail(randomPicture)
            .setFooter(" Information you can always use to hide your real identity. (NOT ALL INFORMATION IN THIS PROFILE IS ACCURATE)", "https://avatars.githubusercontent.com/u/78051846?v=4")
            .addFields({name: `👤**Basic Informations**:`, value: `**Gender**: ${randomGender}\n **Firstname**: ${randomSuffix} ${randomName}\n **Music-Genre**: ${randomMusic}\n **Mobile**: ${randomCell}\n\n`}) //**E-Mail**: ${randomName}@example.com\n
            //.addFields({name: `⚕️**Health Information:**:`, value: '**Height**: ${}\n **Weight**: ${}\n **Blood Type**: {}\n **Disease History**: {}\n'})
            .addFields({name: `🌐**Location Information**:`, value: `**Street**: ${randomStreet}\n **City**: ${randomCity}\n **State**: ${randomeState}\n **IPV6**: ${randomIpv6}\n **IPV4**: ${randomIpv4}\n\n`}) //**Postcode**: ${randomePost}\n giving false postcode
            .addFields({name: `💻**Login Information**:`, value: `**Username**: ${randomUser}\n **Password**: ${randomPass}\n`})
            //.addFields({name: `👤**Personal Information**:`, value: `**Family Members**:: ${}\n **Family Members**:: ${}\n **Family Members**:: ${}\n **Family Members**:: ${}\n **Family Members**:: ${}\n **Family Members**:: ${}\n **Family Members**:: ${}\n`})
            .addFields({name: `💳**Credit Card Information**:`, value: `**Credit Card Number**: ${randomCCnumber}\n **CVV/CVV2**: ${randomCVV}\n **IBAN**: ${randomIban}\n **BIC**: ${randombic}\n\n`})
            .addFields({name: `🏫**Employment Information**:`, value: `**Job Type**: ${randomJobType}\n **Job Area**: ${randomJobArea}\n\n`})
            .addFields({name: `🚗**Car Information**:`, value: `**Vehicle**: ${randomCar}\n\n`})
            .addFields({name: `🕵️**User Agent**:`, value: `**UserAgent**: ${randomUserAgent}`})
            
            
            

        message.channel.send(newEmbed);
    
    

    }
}