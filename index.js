const Discord = require('discord.js');
const botSettings = require('./botsettings.json');
const game = require('./game.json');
const bot = new Discord.Client();
const fs = require('fs');
let roles;
const json = fs.readFile('./game.json', 'utf8', (err, jsonString) => {
  if (err) {
    console.log('File read failed:', err);
    return;
  }
  roles = JSON.parse(jsonString).roles[0];
});
let gameStarted = false;

bot.on('ready', () => {
  //console.log(bot.user);
});

let neededPlayers = 16;
//Commande rules
bot.on('message', message => {
  if (message.content === '!rules') {
    message.reply(
      'Les règles sont:\nPas de dévo\nPas de triche en mp\nPas de random tir pour Matt(chasseur) ou pour Aizawa(Sorcière)\nJouez fairplay et tout se passera bien\nLight ne dévo pas son rôle a Misa\nKiyomi Tagada ne dévo pas son rôle à light'
    );
  }
});
//Commande !join
bot.on('message', message => {
  if (message.content === '!join') {
    if (gameStarted === false) {
      if (game.players.includes(message.author) === false) {
        game.players.push(message.author);
        message.channel.send(
          message.author.username +
            ' vient de rejoindre la partie ' +
            '**(' +
            game.players.length +
            ' / ' +
            neededPlayers +
            ')**'
        );
      } else {
        message.reply('Vous êtes déjà dans la partie');
      }
    } else {
      message.reply('Vous ne pouvez rejoindre une partie en cours');
    }
  }
});
//Commande !players
bot.on('message', message => {
  function playersname() {
    let playersName = '';
    for (i = 0; i < game.players.length; i++) {
      playersName += game.players[i].username + '\n';
    }
    return playersName;
  }
  if (message.content === '!players') {
    message.reply(
      'Il y a ' + game.players.length + ' joueurs actuellement:' + playersname()
    );
  }
});
//Commande !quit
bot.on('message', message => {
  if (message.content === '!quit') {
    let idOf = message.author.id.toString();
    let id = game.players.findIndex(x => x.id === idOf);
    if (id == -1) {
      message.reply("Vous n'êtes pas dans une partie");
    } else {
      game.players.splice(id);
      message.channel.send(
        message.author.username +
          ' vient de quitter la partie ' +
          '**(' +
          game.players.length +
          ' / ' +
          neededPlayers +
          ')**'
      );
    }
  }
});
//Commande !config
let l1;
let m2;
let t3;
let l4;
let s5;
let m6;
let a7;
let w8;
let m9;
let n10;
let g11;
let m12;
let m13;
let r14;
let r15;
let t16;
function check() {
  if (roles.light.activated == true) {
    l1 = 'activé';
  } else {
    l1 = 'désactivé';
  }

  if (roles.misa.activated == true) {
    m2 = 'activé';
  } else {
    m2 = 'désactivé';
  }

  if (roles.mikami.activated == true) {
    t3 = 'activé';
  } else {
    t3 = 'désactivé';
  }

  if (roles.l.activated == true) {
    l4 = 'activé';
  } else {
    l4 = 'désactivé';
  }

  if (roles.soichiroyagami.activated == true) {
    s5 = 'activé';
  } else {
    s5 = 'décativé';
  }

  if (roles.matsuda.activated == true) {
    m6 = 'activé';
  } else {
    m6 = 'désactivé';
  }

  if (roles.aizawa.activated == true) {
    a7 = 'activé';
  } else {
    a7 = 'désactivé';
  }

  if (roles.watari.activated == true) {
    w8 = 'activé';
  } else {
    w8 = 'désactivé';
  }

  if (roles.mogi.activated == true) {
    m9 = 'activé';
  } else {
    m9 = 'désactivé';
  }

  if (roles.near.activated == true) {
    n10 = 'activé';
  } else {
    n10 = 'désactivé';
  }

  if (roles.gevanni.activated == true) {
    g11 = 'activé';
  } else {
    g11 = 'désactivé';
  }

  if (roles.mello.activated == true) {
    m12 = 'activé';
  } else {
    m12 = 'désactivé';
  }
  if (roles.matt.activated == true) {
    m13 = 'activé';
  } else {
    m13 = 'désactivé';
  }
  if (roles.rem.activated == true) {
    r14 = 'activé';
  } else {
    r14 = 'désactivé';
  }
  if (roles.ryuk.activated == true) {
    r15 = 'activé';
  } else {
    r15 = 'désactivé';
  }
  if (roles.tagada.activated == true) {
    t16 = 'activé';
  } else {
    t16 = 'désactivé';
  }
}
bot.on('message', message => {
  check();
  if (message.content === '!config') {
    /* message.channel.send(
      ' ```Voici la configuration actuelle . Choisis les roles que tu veux activer/désactiver ' +
        ` \n1-Light Yagami(Kira)(${l1})  ` +
        ` \n2-Misa Amane(La deuxième kira)(${m2}) ` +
        `\n3-Teru Mikami(X-Kira)(${t3})` +
        `\n4-L(L'ancien)(${l4})` +
        `\n5-Soichiro Yagami(La justice)(${s5})` +
        `\n6-Tôta Matsuda(L'idiot)(${m6})` +
        `\n7-Shûichi Aizawa(La sorcière)(${a7})` +
        `\n8-Watari(Le manipulateur)(${w8})` +
        `\n9-Kanzô Mogi(Le garde du corps)(${m9})` +
        `\n10-Near(Salvateur)(${n10})` +
        `\n11-Stephen Gevanni(Le trompeur)(${g11})` +
        `\n12-Mello(Le voleur de death note)(${m12})` +
        `\n13-Matt(Chasseur)(${m13})` +
        `\n14-Rem(Voyante)(${r14})` +
        `\n15-Ryuk(L'assassin)(${r15})` +
        `\n16-Kiyomi Takada(La porte parole de Light)(${t16})` +
        `\nIl y a ${neededPlayers} roles activés` +
        '```'
    );*/
    let configEmbed = new Discord.MessageEmbed()
      .setColor('#B71C1C')
      .setTitle('Configuration des rôles')
      .setAuthor(
        'Death Note Bot',
        'https://live.staticflickr.com/3145/3070889272_1980468e7c.jpg'
      )
      .setDescription(
        'Voici la configuration actuelle . Choisis les roles que tu veux activer/désactiver'
      )
      .addField(
        'Les rôles',
        ` \n1-Light Yagami(Kira)(${l1})  ` +
          ` \n2-Misa Amane(La deuxième kira)(${m2}) ` +
          `\n3-Teru Mikami(X-Kira)(${t3})` +
          `\n4-L(L'ancien)(${l4})` +
          `\n5-Soichiro Yagami(La justice)(${s5})` +
          `\n6-Tôta Matsuda(L'idiot)(${m6})` +
          `\n7-Shûichi Aizawa(La sorcière)(${a7})` +
          `\n8-Watari(Le manipulateur)(${w8})` +
          `\n9-Kanzô Mogi(Le garde du corps)(${m9})` +
          `\n10-Near(Salvateur)(${n10})` +
          `\n11-Stephen Gevanni(Le trompeur)(${g11})` +
          `\n12-Mello(Le voleur de death note)(${m12})` +
          `\n13-Matt(Chasseur)(${m13})` +
          `\n14-Rem(Voyante)(${r14})` +
          `\n15-Ryuk(L'assassin)(${r15})` +
          `\n16-Kiyomi Takada(La porte parole de Light)(${t16})`,
        true
      )
      .addField(
        'Nombre de rôles activés',
        `Il y a ${neededPlayers} roles activés`,
        true
      )
      .setFooter('Ce bot a été créé par Lexii et WiNoName');
    message.channel.send(configEmbed);
    const filter = m => m.author.id === message.author.id;

    const answer = message.channel
      .awaitMessages(filter, {
        maxMatches: 1,
        max: 1,
        time: 10000,
        errors: ['time', 'maxMatches']
      })
      .then(collected => {
        if (!message.member.hasPermission('ADMINISTRATOR'))
          return message.channel.send(
            ":x: **| Vous n'avez pas la permission d'éxécuter cette commande!**"
          );
        if (collected.first().content == 1) {
          message.reply(
            'Vous ne pouvez pas commencer une partie sans Light Yagami'
          );
        } else if (collected.first().content == 2) {
          if (roles.misa.activated == true) {
            message.channel.send('Vous venez de désactiver Misa Amane');
            roles.misa.activated = false;
            neededPlayers -= 1;
          } else {
            message.channel.send('Vous venez de réactiver Misa Amane');
            roles.misa.activated = true;
            neededPlayers += 1;
          }
        } else if (collected.first().content == 3) {
          if (roles.mikami.activated == true) {
            message.channel.send('Vous venez de désactiver Teru Mikami');
            roles.mikami.activated = false;
            neededPlayers -= 1;
          } else {
            message.channel.send('Vous venez de réactiver Teru Mikami');
            roles.mikami.activated = true;
            neededPlayers += 1;
          }
        } else if (collected.first().content == 4) {
          if (roles.l.activated == true) {
            message.channel.send('Vous venez de désactiver L');
            roles.l.activated = false;
            neededPlayers -= 1;
          } else {
            message.l.send('Vous venez de réactiver L');
            roles.light.activated = true;
            neededPlayers += 1;
          }
        } else if (collected.first().content == 5) {
          if (roles.soichiroyagami.activated == true) {
            message.channel.send('Vous venez de désactiver Soichiro Yagami');
            roles.soichiroyagami.activated = false;
            neededPlayers -= 1;
          } else {
            message.channel.send('Vous venez de réactiver Soichiro Yagami');
            roles.soichiroyagami.activated = true;
            neededPlayers += 1;
          }
        } else if (collected.first().content == 6) {
          if (roles.matsuda.activated == true) {
            message.channel.send('Vous venez de désactiver Tôta Matsuda');
            roles.matsuda.activated = false;
            neededPlayers -= 1;
          } else {
            message.channel.send('Vous venez de réactiver Tôta Matsuda');
            roles.matsuda.activated = true;
            neededPlayers += 1;
          }
        } else if (collected.first().content == 7) {
          if (roles.aizawa.activated == true) {
            message.channel.send('Vous venez de désactiver Shûichi Aizawa');
            roles.aizawa.activated = false;
            neededPlayers -= 1;
          } else {
            message.channel.send('Vous venez de réactiver Shûichi Aizawa');
            roles.aizawa.activated = true;
            neededPlayers += 1;
          }
        } else if (collected.first().content == 8) {
          if (roles.watari.activated == true) {
            message.channel.send('Vous venez de désactiver Watari');
            roles.watari.activated = false;
            neededPlayers -= 1;
          } else {
            message.channel.send('Vous venez de réactiver Watari');
            roles.watari.activated = true;
            neededPlayers += 1;
          }
        } else if (collected.first().content == 9) {
          if (roles.mogi.activated == true) {
            message.channel.send('Vous venez de désactiver Kanzô Mogi');
            roles.mogi.activated = false;
            neededPlayers -= 1;
          } else {
            message.channel.send('Vous venez de réactiver Kanzô Mogi');
            roles.mogi.activated = true;
            neededPlayers += 1;
          }
        } else if (collected.first().content == 10) {
          if (roles.near.activated == true) {
            message.channel.send('Vous venez de désactiver Near');
            roles.near.activated = false;
            neededPlayers -= 1;
          } else {
            message.channel.send('Vous venez de réactiver Near');
            roles.near.activated = true;
            neededPlayers += 1;
          }
        } else if (collected.first().content == 11) {
          if (roles.gevanni.activated == true) {
            message.channel.send('Vous venez de désactiver Stephen Gevanni');
            roles.gevanni.activated = false;
            neededPlayers -= 1;
          } else {
            message.channel.send('Vous venez de réactiver Stephen Gevanni');
            roles.gevanni.activated = true;
            neededPlayers += 1;
          }
        } else if (collected.first().content == 12) {
          if (roles.mello.activated == true) {
            message.channel.send('Vous venez de désactiver Mello');
            roles.mello.activated = false;
            neededPlayers -= 1;
          } else {
            message.channel.send('Vous venez de réactiver Mello');
            roles.mello.activated = true;
            neededPlayers += 1;
          }
        } else if (collected.first().content == 13) {
          if (roles.matt.activated == true) {
            message.channel.send('Vous venez de désactiver Matt');
            roles.matt.activated = false;
            neededPlayers -= 1;
          } else {
            message.channel.send('Vous venez de réactiver Matt');
            roles.matt.activated = true;
            neededPlayers += 1;
          }
        } else if (collected.first().content == 14) {
          if (roles.rem.activated == true) {
            message.channel.send('Vous venez de désactiver Rem');
            roles.rem.activated = false;
            neededPlayers -= 1;
          } else {
            message.channel.send('Vous venez de réactiver Rem');
            roles.rem.activated = true;
            neededPlayers += 1;
          }
        } else if (collected.first().content == 15) {
          if (roles.ryuk.activated == true) {
            message.channel.send('Vous venez de désactiver Ryuk');
            roles.ryuk.activated = false;
            neededPlayers -= 1;
          } else {
            message.channel.send('Vous venez de réactiver Ryuk');
            roles.ryuk.activated = true;
            neededPlayers += 1;
          }
        } else if (collected.first().content == 16) {
          if (roles.tagada.activated == true) {
            message.channel.send('Vous venez de désactiver Kiyomi Takada');
            roles.tagada.activated = false;
            neededPlayers -= 1;
          } else {
            message.channel.send('Vous venez de réactiver Kiyomi Takada');
            roles.tagada.activated = true;
            neededPlayers += 1;
          }
        } else {
          message.channel.send('Veuillez choisir un nombre dans la liste');
        }
      });
  }
});

//Commande !start
bot.on('message', message => {
  if (message.content === '!start') {
    if (
      roles.l.activated == false &&
      roles.soichiroyagami.activated == false &&
      roles.matsuda.activated == false &&
      roles.aizawa.activated == false &&
      roles.watari.activated == false &&
      roles.mogi.activated == false &&
      roles.near.activated == false &&
      roles.gevanni.activated == false &&
      roles.mello.activated == false &&
      roles.matt.activated == false &&
      roles.rem.activated == false
    ) {
      message.reply('Vous ne pouvez commencer une partie sans gentils');
    }
    if (game.players.length != neededPlayers) {
      message.reply('Il n y a pas assez de joueurs dans la partie');
    } else {
      message.channel.send('La partie peut commencer. Bonne chance à tous!');
    }
  }
});

bot.login(botSettings.token);
