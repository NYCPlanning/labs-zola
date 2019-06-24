export default function(array1, array2) {
  array1.sort();
  array2.sort();

  return array1.every((value, index) => value === array2[index]);
}
