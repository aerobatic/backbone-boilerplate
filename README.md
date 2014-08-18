Backbone Boilerplate
====================

This boilerplate is a solid starting point for building a new Backbone application with the [Aerobatic HTML5 cloud platform](http://www.aerobatic.io). It is forked from the [Backbone Boilerplate](https://github.com/backbone-boilerplate/backbone-boilerplate) repo developed by @tbranyen with contributions from several prominent members of the Backbone community. It uses requirejs for dependency management and comes ready with unit testing all setup.

## Documentation ##

[Backbone Boilerplate Wiki](https://github.com/backbone-boilerplate/backbone-boilerplate/wiki)

## Getting started ##

You can create your own Aerobatic app based on this template by logging in with GitHub at http://www.aerobatic.io and selecting "Backbone Boilerplate" in the setup instructions.

You will need to download and install [Node.js](http://nodejs.org/) if you want
to use the commands in the following sections.

## Updating dependencies ##

Third party packages may update independently from this main repo, so it's a
good idea to update after fetching.

``` bash
# Install global dependencies.  Depending on your user account you may need to
# gain elevated privileges using something like `sudo`.
npm install -g grunt-cli bower

# Optionally install coveralls (integration is baked in with Travis CI).
npm install -g coveralls

# Install NPM dependencies.
npm install

# Install Bower dependencies.
bower install
```

## Build process ##

The build process consists of numerous Grunt plugin tasks that work together
to optimize your application.

``` bash
# To run the build process, run the default Grunt task.
grunt build

# Run a build and test the now optimized assets.
grunt sim --open
```

## Running tests ##

To run tests, simply add `.spec.js` files throughout your application and they
will be automatically picked up by the runner.  You can find example test specs
in the `test` directory.

To run Karma as a daemon:
*Which will automatically run your tests after you save.*

``` bash
grunt karma:daemon
```

To run Karma tests once and output the results:

``` bash
grunt karma:run
```

After either above command is run, code coverage reports will be available in
the `test/coverage` folder.

By default, the test runner is Mocha and Chai.  You can easily change this by
editting the commented regions of the karma configuration in `Gruntfile.js`.

## License ##
Copyright © 2014 Tim Branyen (@tbranyen)  
Licensed under the MIT license.
