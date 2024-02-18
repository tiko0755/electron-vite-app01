// const props = defineProps({
//   // eslint-disable-next-line vue/require-prop-types, vue/prop-name-casing
//   msg: {
//     String,
//     default: 'chart'
//   }
// })
const splitData = (rawData) => {
const categoryData = [];
const values = [];
const volumes = [];
const exchs = [];
const z5 = [];
const z10 = [];
const z20 = [];
const z30 = [];
const z40 = [];
const z60 = [];
for (let i = 0; i < rawData.length; i++) {
categoryData.push(rawData[i][0]);
const rec = [];
rec.push(rawData[i][1]);
rec.push(rawData[i][2]);
rec.push(rawData[i][3]);
rec.push(rawData[i][4]);
values.push(rec);
volumes.push([i, rawData[i][5], rawData[i][1] > rawData[i][2] ? 1 : -1]);
exchs.push(rawData[i][6]);
z5.push(rawData[i][7]);
z10.push(rawData[i][8]);
z20.push(rawData[i][9]);
z30.push(rawData[i][10]);
z40.push(rawData[i][11]);
z60.push(rawData[i][12]);
}
return {
categoryData: categoryData,
values: values,
volumes: volumes,
exchs: exchs,
z5: z5,
z10: z10,
z20: z20,
z30: z30,
z40: z40,
z60: z60
};
};
