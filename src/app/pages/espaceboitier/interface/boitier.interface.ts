import {Promise} from "q";
import { Client, Compte } from "../../espaceclient/service/Client";
import { Boitier, Brancher, Engine, Sim, Type_boitier, Type_operateur } from '../service/Boitier';

export abstract class BoitierInterface {

  abstract   installation(brancher: Brancher):Promise<any>;


}
