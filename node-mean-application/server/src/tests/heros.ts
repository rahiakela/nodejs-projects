process.env.NODE_ENV = 'test';

// mocha
import 'mocha';
import { suite, test } from 'mocha-typescript';
import { HeroModel, HeroModelStatic } from '../model/hero';
import { Hero } from '../model/interfaces/hero';
import { heroSchema } from '../model/schemas/hero';
import { Server } from '../server';

// mongoose
import mongoose = require('mongoose');

// require http server
var http = require('http');

// require chai and use should assertions
let chai = require('chai');
chai.should();

// configure chai-http
chai.use(require('chai-http'));

@suite
class HerosTest {
  public static BASE_URI: string = '/api/heros';

  // the mongooose connection
  public static connection: mongoose.Connection;

  // hero model
  public static Hero: HeroModelStatic;
  // hero document
  public static hero: HeroModel;

  // the http server
  public static server: any;

  /**
   * Before all hook.
   */
  public static before() {
    // connect to MongoDB
    mongoose.connect('mongodb://localhost:27017/mean-material-reactive');
    HerosTest.Hero = mongoose.model<HeroModel, HeroModelStatic>('Hero', heroSchema);

    // create http server
    let port = 8001;
    let app = Server.bootstrap().app;
    app.set('port', port);
    HerosTest.server = http.createServer(app);
    HerosTest.server.listen(port);

    return HerosTest.createHero();
  }

  /**
   * After all hook
   */
  public static after() {
    return HerosTest.hero.remove().then(() => {
      return mongoose.disconnect();
    });
  }

  /**
   * Create a test hero.
   */
  public static createHero(): Promise<HeroModel> {
    const data: Hero = {
      name: 'Rahi Akela',
    };

    return new HerosTest.Hero(data).save().then(hero => {
      return (HerosTest.hero = hero);
    });
  }

  // Test delete function
  @test
  public delete() {
    const data: Hero = { name: 'To be deleted' };

    return new HerosTest.Hero(data).save().then(hero => {
      return chai
        .request(HerosTest.server)
        .del(`${HerosTest.BASE_URI}/${hero._id}`)
        .then((response: any) => {
          response.should.have.status(200);
        });
    });
  }

  // Test get function
  @test
  public get() {
    return chai
      .request(HerosTest.server)
      .get(`${HerosTest.BASE_URI}/5b691f3c6916cd262ca49990`)
      .then((response: any) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('name').eql(HerosTest.hero.name);
      });
  }

  // Test list function
  @test
  public list() {
    return chai
      .request(HerosTest.server)
      .get(HerosTest.BASE_URI)
      .then((response: any) => {
        response.should.have.status(200);
        response.body.should.be.an('array');
        response.body.should.have.lengthOf(3);
      });
  }

  // Test post function
  @test
  public post() {
    const data: Hero = { name: 'Magneto' };

    return chai
      .request(HerosTest.server)
      .post(HerosTest.BASE_URI)
      .send(data)
      .then((response: any) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.a.property('_id');
        response.body.should.have.property('name').eql(data.name);

        return HerosTest.Hero.findByIdAndRemove(response.body._id).exec();
      });
  }

  // Test put function
  @test
  public put() {
    const data: Hero = { name: 'Superman' };

    return chai
      .request(HerosTest.server)
      .put(`${HerosTest.BASE_URI}/${HerosTest.hero._id}`)
      .send(data)
      .then((response: any) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.a.property('_id');
        response.body.should.have.property('name').eql(data.name);
      });
  }
}
