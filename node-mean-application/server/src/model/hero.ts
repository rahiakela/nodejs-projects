import { Document, Model } from 'mongoose';
import { Hero as HeroDomain } from './interfaces/hero';
import { heroSchema } from './schemas/hero';
import mongoose = require('mongoose');

export interface HeroModel extends HeroDomain, Document {}
export interface HeroModelStatic extends Model<HeroModel> {}

export const Hero = mongoose.model<HeroModel, HeroModelStatic>('Hero', heroSchema);
