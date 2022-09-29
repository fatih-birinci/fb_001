const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { clientId, guildId, token } = require(`./config${process.env['NODE_ENV'] ? '_' + process.env['NODE_ENV'] : ''}.json`);

const commands = [
	new SlashCommandBuilder()
    .setName('invite')
    .setDescription('Creates invite for an email address!')
    .addStringOption(option =>
      option.setName('email')
        .setDescription('User email')
        .setRequired(true)),

  new SlashCommandBuilder()
    .setName('register')
    .setDescription('Registers a user!')
    .addStringOption(option =>
      option.setName('email')
        .setDescription('User email')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('name')
        .setDescription('Full Name')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('company')
        .setDescription('Company')
        .setRequired(false))
    .addStringOption(option =>
      option.setName('title')
        .setDescription('Job Title')
        .setRequired(false)),

  new SlashCommandBuilder()
    .setName('email')
    .setDescription('Returns email of a user if registered')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user')
        .setRequired(true)),

  new SlashCommandBuilder()
    .setName('info')
    .setDescription('Returns all available info about user')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user')
        .setRequired(true)),

  new SlashCommandBuilder()
    .setName('emails')
    .setDescription('Returns email list for a role')
    .addRoleOption(option =>
      option.setName('role')
        .setDescription('The role')
        .setRequired(true)),

  new SlashCommandBuilder()
    .setName('correlate')
    .setDescription('Correlates Discord members and registrations via server nickname'),

  new SlashCommandBuilder()
    .setName('aboutmyself')
    .setDescription('Shows your profile if correlated with Discord account'),

  new SlashCommandBuilder()
    .setName('updatemyself')
    .setDescription('Creates, redeems or updates your IT Society profile')
    .addStringOption(option =>
      option.setName('email')
        .setDescription('Email')
        .setRequired(false))
    .addStringOption(option =>
      option.setName('name')
        .setDescription('Full Name')
        .setRequired(false))
    .addStringOption(option =>
      option.setName('company')
        .setDescription('Company')
        .setRequired(false))
    .addStringOption(option =>
      option.setName('title')
        .setDescription('Job Title')
        .setRequired(false)),

].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);