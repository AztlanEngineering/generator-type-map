const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')
let pjson = require('../../package.json')
const version = pjson.version
const pkg = pjson.name

function pascalToSnake(s){
  return s
    .replace(/(?:^|\.?)([A-Z])/g, (x,y) => '_' + y.toLowerCase())
    .replace(/^_/, '')
}

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)

    // This makes `appname` a required argument.
    this.argument('name', { type: String, required: true })
    this.option('common', { 
      type: String, 
      alias: 'c',
      desc:'whether this component is a "common" component, meaning a sub component of another component. It will be generated in the current folder'
    })
    this.option('simple', { 
      type: Boolean, 
      alias: 's',
      desc:'Whether to use the simple template'
    })
    this.option('withcommon', { 
      type: Boolean, 
      alias: 'w',
      desc:'Whether to create the common directory on execution (if this component will have subcomponents)'
    })
    this.option('withquery', { 
      type: String, 
      alias: 'q',
      desc:'Whether this component should be generated with a graphql query'
    })
    this.option('module', { 
      type: Boolean, 
      alias: 'm',
      desc:'Whether this is a site module (not a component)'
    })
    this.option('page', { 
      type: Boolean, 
      alias: 'p',
      desc:'Whether this is a site page'
    })
    this.option('messages', { 
      type: Boolean, 
      alias: 'z',
      desc:'Create component messages. THis does not create a component and should be executed separetely'
    })
    

    // And you can then access it later; e.g.
    if (!this.options.module) {
      this.log('Name', this.options.name)
      this.log('Is a common component ?', !!this.options.common)
      this.options.common ?
        this.log('Common for', this.options.common) :
        this.log('Create common dir ?', !!this.options.withcommon)
    }
    else {
      this.log('We are creating module ', this.options.name)
    }
  }

  /*prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the legendary ${chalk.red('generator-react-scss-component')} generator!`)
    );

    const prompts = [
			      {
        type: "input",
        name: "name",
        message: "What is the name of the component ?",
				default: 'NewComponent' //this.appname // Default to current folder name
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
	}*/

  _touchFile(relativeFilePath) {
    this.log('TOUCH : ', relativeFilePath)

    const fullPath = path.resolve(path.join(process.cwd(), relativeFilePath))
    fs.closeSync(fs.openSync(fullPath, 'w'))
  }

  _touchOrAppendToIndex(a) {
    const localIndex = 'index.js'
    const localIndexExists = () => this.fs.exists(localIndex)
    const fullPathLocalIndex = path.resolve(path.join(process.cwd(), localIndex))
  
    if (!localIndexExists()){
      //this.fs.write(localIndex, '')
      this._touchFile(localIndex)
    }
  
    fs.appendFileSync(fullPathLocalIndex, a)
    this.log(`updated \x1b[36m\x1b[1m ${localIndex} \x1b[0m`)

  }

  _generateModule() {
    this.log('MODE : GENERATE MODULE')

    const {
      name,
      withquery,
    } = this.options
    
    const targetFolder = './' + name  +'/'
    const lower = pascalToSnake(name)
    const chunk_name = lower

    const fullTemplateDict = {
      name,
      lower,
      chunk_name,//Used ?
      version,
      pkg
    }

    mkdirp.sync(name)
    
    this.destinationRoot(targetFolder)

    this.fs.copyTpl(
      this.templatePath('module/urls.js'),
      this.destinationPath('urls.js'),
      fullTemplateDict
    )

    this.fs.copyTpl(
      this.templatePath('module/routes.js'),
      this.destinationPath('routes.js'),
      fullTemplateDict
    )

    this.fs.copyTpl(
      this.templatePath('module/index.js'),
      this.destinationPath('index.js'),
      fullTemplateDict
    )

    mkdirp.sync('components')
    this._touchFile(`components/index.js`)

    mkdirp.sync('pages')
    this._touchFile(`pages/index.js`)

    this.log('!!! DO NOT FORGETY')
    this.log('1) Add module routes to routes.js')
    this.log('2) Add module url exports to urls.js')

  }

  _create({
      componentName,
      targetFolder='./',
      createDir=false,
      createIndex=false,
      appendToIndex=true,
      scssFilename,
      syncComponent='Component.js',
      withquery=false,
      templateDict={}
  } ) {

    const fullTemplateDict = {
      ...templateDict,
      version,
      pkg
    }
    
    if(createDir) mkdirp.sync(componentName)

    const stringToAppendToIndex = createDir ?
      `export { ${componentName} } from './${componentName}'\n` :
      `export { default as ${componentName} } from './${componentName}'\n`

    appendToIndex && this._touchOrAppendToIndex(stringToAppendToIndex)

    this.destinationRoot(targetFolder)

    if (createIndex) this.fs.copyTpl(
      this.templatePath('component/index.js'),
      this.destinationPath('index.js'),
      fullTemplateDict,
    )

    if(scssFilename) this.fs.copyTpl(
      this.templatePath('component/component.scss'),
      this.destinationPath(scssFilename),
      fullTemplateDict,
    )

    if (withquery){
      mkdirp.sync('graphql')
      this._touchFile(`graphql/${withquery}.gql`)
    }

    this.fs.copyTpl(
      this.templatePath(`component/${syncComponent}`),
      this.destinationPath(componentName + '.js'),
      fullTemplateDict
    )
    
  }

  _generateComponent() {

    this.log('MODE : GENERATE COMPONENT')

    const {
      name,
      withquery,
    } = this.options
    
    const targetFolder = './' + name  +'/'
    const lower = pascalToSnake(name)
    const scssFilename = lower + '.scss'
    const chunk_name = lower

    const templateDict = {
        name,
        scss:scssFilename,
        lower,
        chunk_name,
        withquery
    } //Options to pass to the templates. pkg and version will be added automatically


    this._create({
      componentName:name,
      targetFolder,
      createDir:true,
      createIndex:true,
      scssFilename,
      //syncComponent:'Component.js' //Default
      withquery,
      templateDict
    })
  }

  _generateSimpleComponent() {

    this.log('MODE : GENERATE SIMPLE COMPONENT')

    const {
      name,
      withquery,
    } = this.options
    
    const targetFolder = './' + name  +'/'
    const lower = pascalToSnake(name)
    const chunk_name = lower

    const templateDict = {
        name,
        lower,
        chunk_name,
        withquery,
    } //Options to pass to the templates. pkg and version will be added automatically


    this._create({
      componentName:name,
      targetFolder,
      createDir:true,
      createIndex:true,
      syncComponent:'SimpleComponent.js', //Default
      withquery,
      templateDict
    })
  }

  _generateCommonComponent() {

    this.log('MODE : GENERATE COMMON COMPONENT')

    const {
      name,
      common,
      withquery,
    } = this.options
    
    const targetFolder = './'
    const lower = pascalToSnake(name)
    const scssFilename = lower + '.scss'
    const chunk_name = pascalToSnake(common)

    const templateDict = {
        name,
        scss:scssFilename,
        lower,
        chunk_name,
        withquery
    } //Options to pass to the templates. pkg and version will be added automatically

    this._create({
      componentName:name,
      targetFolder,
      //createDir:false, //default
      //createIndex:false, //default
      scssFilename,
      //syncComponent:'Component.js' //Default
      withquery,
      templateDict
    })
  }

  _generatePage() {

    this.log('MODE : GENERATE PAGE')

    const {
      name,
      common,
      withquery,
    } = this.options
    
    const targetFolder = './'
    const lower = pascalToSnake(name)
    //const scssFilename = lower + '.scss' //No css here
    const chunk_name = common ? pascalToSnake(common) : pascalToSnake(name)

    const templateDict = {
        name,
        lower,
        chunk_name,
        withquery
    } //Options to pass to the templates. pkg and version will be added automatically

    this._create({
      componentName:name,
      targetFolder,
      //createDir:false, //default
      //createIndex:false, //default
      //scssFilename, //No css here
      syncComponent:'Page.js', //Default
      withquery,
      templateDict
    })

  }

  _generateMessages() {

    this.log('MODE : GENERATE MESSAGES')

    const {
      name,
    } = this.options
    
    const targetFolder = './'

    const lower = pascalToSnake(name)

    const templateDict = {
      name,
      lower
    } //Options to pass to the templates. pkg and version will be added automatically

    this._create({
      componentName:'messages',
      targetFolder,
      //createDir:false, //default
      //createIndex:false, //default
      //scssFilename, //No css here
      appendToIndex:false,
      syncComponent:'Messages.js', //Default
      templateDict
    })

  }

  writing() {
    this.log('STARTING')

    const {
      common,
      module,
      simple,
      page,
      messages
    } = this.options


    if(!module) {
      if (messages) this._generateMessages()
      else if (page) this._generatePage()
      else if (!common) {
        if(simple) this._generateSimpleComponent()
        else this._generateComponent()
      }
      else this._generateCommonComponent()
    } else {
      this._generateModule()
    }


  }

  install() {
    //this.installDependencies();
  }
}
