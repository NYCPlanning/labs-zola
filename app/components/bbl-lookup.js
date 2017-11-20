import Ember from 'ember';
import carto from '../utils/carto';


// export function getUniqueOptionsFor([column, sql]) {
//   const uniqueSQL = `select distinct(${column}) as option from (${sql}) a ORDER BY option ASC`;
//   return carto.SQL(uniqueSQL)
//     .then(response =>
//       response.map(row =>
//         row.option,
//       ),
//     );
// }



export default Ember.Component.extend({
  classNames: ['bbl-lookup hide-for-print'],

  boro: '',
  block: '',
  lot: '',

  closed: false,
  actions: {
    checkBBL() {
      const { boro, block, lot } = this.getProperties('boro', 'block', 'lot');
      const uniqueSQL = `select bbl from support_mappluto where block= ${block} and lot = ${lot} and borocode = ${boro}`;
      carto.SQL(uniqueSQL).then(response => {
        console.log(response);
        return response;
      });
      console.log('checkBBL', uniqueSQL);
    },
  },
});
