import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class TaxasIndexController extends Controller {
    @tracked rates = [];
    @tracked isSaving = false;

    @action
    updateRate(rate, event) {
        rate.value = parseFloat(event.target.value) || 0;
    }

    @action
    saveRates() {
        // TODO: conectar com API
    }
}
