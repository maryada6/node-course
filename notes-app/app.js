const validator= require('validator');
const chalk = require('chalk');
const fs= require('fs');
const yargs=require('yargs');
const notes=require('./notes');
yargs.command({
    command :'add',
    describe:'Add a note',
    builder:{
        title:{
            describe:"Note Title",
            demandOption:true,
            type:'string'
        },
        body:{
            describe:"Note Body",
            demandOption:true,
            type:'string'
        },
    
    },
    handler(argv){
        notes.addNote(argv.title,argv.body);
        // console.log("adding","Note title ",argv.title," Note body ",argv.body);
        
    },
});

yargs.command({
    command :'remove',
    describe:'Remove a note',
    builder:{
        title:{
            describe:"Note Title",
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title);
    },
});

yargs.command({
    command :'read',
    describe:'Read a note',
    builder:{
        title:{
            describe:"Note Title",
            demandOption:true,
            type:'string'
        }, 
    },
    handler(argv){
        notes.readNote(argv.title);
    }
    });

yargs.command({
    command :'list',
    describe:'List all notes',
    handler(){
        notes.listNote();
    },
});

yargs.parse();



