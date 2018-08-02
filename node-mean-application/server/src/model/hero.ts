import { Document, Model } from 'mongoose';
import { heroSchema } from './schemas/hero';
import mongoose = require('mongoose');

export interface Hero {
  name?: string;
}

export interface HeroModel extends Hero, Document {}
export interface HeroModelStatic extends Model<HeroModel> {}

export const Hero = mongoose.model<HeroModel, HeroModelStatic>('Hero', heroSchema);
