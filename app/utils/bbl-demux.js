import numeral from 'npm:numeral';

export default function bblDemux(bbl = '') {
  if (typeof bbl === 'string' || typeof bbl === 'number') {
    const bblString = bbl.toString();
    const boro = bblString.substring(0, 1);
    const block = parseInt(bblString.substring(1, 6), 10);
    const lot = parseInt(bblString.substring(6), 10);

    return { boro, block, lot };
  }

  let { boro, block, lot } = bbl;
  if (boro && block && lot) {
    boro = numeral(boro).format('0');
    block = numeral(block).format('00000');
    lot = numeral(lot).format('0000');
    return `${boro}${block}${lot}`;
  }

  return false;
}
