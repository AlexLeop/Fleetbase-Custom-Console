import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class CreditosIndexController extends Controller {
    @tracked credits = [];
}
