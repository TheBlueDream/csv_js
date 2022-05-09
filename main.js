// fs 임포트
const fs = require('fs');

//csv 파일 참조부
const file_csv = fs.readFileSync('./data/data_2.csv');
const string_csv = file_csv.toString();

// json 생성부
const arr_json = csvToJSON(string_csv);
const string_json = JSON.stringify(arr_json);
fs.writeFileSync('./data/data.json', string_json);

// json 객체 생성부
// 객체 키값 업종 종류, 음식점, 이미용, 숙박업, 세탁업
const jsonobj = JSON.parse(string_json);


function csvToJSON(csv_string){  
    const rows = csv_string.split("\r\n"); 
    const jsonArray = [];
    const header = rows[0].split(",");
    for(let i = 1; i < rows.length; i++){
        let obj = {}; 
        let row = rows[i].split(","); 
        for(let j=0; j < header.length; j++){ 
            obj[header[j]] = row[j]; 
        }
        jsonArray.push(obj); 
    } 
    return jsonArray; 
    // 문자열 형태의 JSON으로 반환할 경우, 아래 코드 사용 
    // return JSON.stringify(jsonArray); 
}

// json 객체 검색 함수
// 객체, 필드명, 검색값 으로 객체리스트속 키값에 검색어가 포함되있으면 객체 배열로 리턴
function getObjectsSearch(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjectsSearch(obj[i], key, val));    
        } else 
        if (i == key && obj[i].includes(val) == true) { //
            objects.push(obj);
        }
    }
    return objects;
}

console.log(getObjectsSearch(jsonobj, '지역', '서'));


// 필드명, 키값 으로 json 리스트 출력
// return an array of objects according to key, value, or key and value matching
// console.log(getObjects(jsonobj,'업종','음식점'));
// 소스코드 참고 : http://techslides.com/how-to-parse-and-search-json-in-javascript
function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));    
        } else 
        //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
        if (i == key && obj[i] == val || i == key && val == '') { //
            objects.push(obj);
        } else if (obj[i] == val && key == ''){
            //only add if the object is not already in the array
            if (objects.lastIndexOf(obj) == -1){
                objects.push(obj);
            }
        }
    }
    return objects;
}

//console.log(getObjects(jsonobj,'업종','음식점'));


