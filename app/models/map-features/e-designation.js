import DS from 'ember-data';
import MF from 'ember-data-model-fragments';

const { attr } = DS;

export default class EDesignationFragment extends MF.Fragment {
    @attr('string')
    address;

    @attr('string')
    ceqr_num;

    @attr('string')
    enumber;

    @attr('string')
    ulurp_num;
}
