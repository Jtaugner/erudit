
window.onload = function(){
    let mainWordsCopy = words.slice();
    let advTime = true;
    let showAdv;
    function getFromStorage(name) {
        try {
            let val = localStorage.getItem(name);
            if (val) return val;
        } catch (e) {
        }
    }

    function setToStorage(name, val) {
        try {
            localStorage.setItem(name, val);
        } catch (e) {}
    }
    function deleteFromStorage(name){
        try {
            localStorage.removeItem(name);
        } catch (e) {}
    }
    let save = getFromStorage('save');
    if(save){
        save = JSON.parse(save);
        if(!save.allLetters){
            save = false;
        }else if(save.allLetters.length === 0 && save.allMyLetters.length === 0 && save.allBotLetters.length === 0){
            save = false;
        }
    }
    function params(data) {
        try{
            ym(57224761, 'params', data);
        }catch(ignored){}
    }
    let letters = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ь', 'Ы', 'Ъ', 'Э', 'Ю', 'Я'];
    let lettersScore = {
        'А': 1,
        'Б': 3,
        'В': 2,
        'Г': 3,
        'Д': 2,
        'Е': 1,
        'Ж': 5,
        'З': 5,
        'И': 1,
        'Й': 2,
        'К': 2,
        'Л': 2,
        'М': 2,
        'Н': 1,
        'О': 1,
        'П': 2,
        'Р': 2,
        'С': 2,
        'Т': 2,
        'У': 3,
        'Ф': 9,
        'Х': 5,
        'Ц': 9,
        'Ч': 5,
        'Ш': 9,
        'Щ': 9,
        'Ь': 5,
        'Ы': 5,
        'Ъ': 9,
        'Э': 9,
        'Ю': 9,
        'Я': 3
    };
    let lettersCount = {
        15: [
            ['А', 9],
            ['Б', 4],
            ['В', 5],
            ['Г', 3],
            ['Д', 5],
            ['Е', 8],
            ['Ж', 2],
            ['З', 2],
            ['И', 7],
            ['Й', 4],
            ['К', 7],
            ['Л', 4],
            ['М', 5],
            ['Н', 7],
            ['О', 9],
            ['П', 6],
            ['Р', 6],
            ['С', 6],
            ['Т', 5],
            ['У', 3],
            ['Ф', 2],
            ['Х', 2],
            ['Ц', 2],
            ['Ч', 2],
            ['Ш', 2],
            ['Щ', 2],
            ['Ь', 2],
            ['Ы', 2],
            ['Ъ', 1],
            ['Э', 2],
            ['Ю', 2],
            ['Я', 3]
        ],
        9: [
            ['А', 5],
            ['Б', 2],
            ['В', 3],
            ['Г', 2],
            ['Д', 3],
            ['Е', 4],
            ['Ж', 1],
            ['З', 1],
            ['И', 4],
            ['Й', 2],
            ['К', 4],
            ['Л', 2],
            ['М', 3],
            ['Н', 4],
            ['О', 5],
            ['П', 3],
            ['Р', 3],
            ['С', 3],
            ['Т', 2],
            ['У', 2],
            ['Ф', 1],
            ['Х', 2],
            ['Ц', 1],
            ['Ч', 2],
            ['Ш', 1],
            ['Щ', 1],
            ['Ь', 1],
            ['Ы', 1],
            ['Ъ', 1],
            ['Э', 1],
            ['Ю', 1],
            ['Я', 2]
        ]

    };


    let word_x3_15 = [
        '0-0', '0-7', '0-14',
        '7-0', '7-14',
        '14-0', '14-7', '14-14'
    ];
    let word_x2_15 = [
        '1-1', '2-2', '3-3', '4-4',
        '13-1', '12-2', '11-3', '10-4',
        '1-13', '2-12', '3-11','4-10',
        '10-10', '11-11', '12-12','13-13'
    ];
    let letter_x2_15 = [
        '0-3', '3-0', '0-11','11-0',
        '3-14', '11-14', '14-3', '14-11',
        '2-6', '2-8', '3-7',
        '6-2', '8-2', '7-3',
        '6-6', '8-8', '6-8', '8-6',
        '6-12', '7-11', '8-12',
        '12-6', '11-7', '12-8'
    ];
    let letter_x3_15 = [
        '1-5', '1-9',
        '5-1', '5-5', '5-9', '5-13',
        '9-1', '9-5', '9-9', '9-13',
        '13-5', '13-9'
    ];
    let word_x3_9 = [
        '0-0', '8-8', '0-8', '8-0'
    ];
    let word_x2_9 = [
        '0-4', '4-0', '8-4', '4-8'
    ];
    let letter_x2_9 = [
        '2-2', '3-3', '2-6', '3-5',
        '6-2', '5-3', '5-5', '6-6'
    ];
    let letter_x3_9 = [
        '1-1', '1-7', '7-1', '7-7'
    ];
    let words_length = {
        15: 7, 9: 5
    };
    let last = [];
    let words_x2 = {15: word_x2_15, 9: word_x2_9};
    let words_x3 = {15: word_x3_15, 9: word_x3_9};
    let letters_x2 = {15: letter_x2_15, 9: letter_x2_9};
    let letters_x3 = {15: letter_x3_15, 9: letter_x3_9};
    let KI_INTELLIGENCE = 1;
    function isWordInDictionary(word) {
        word = word.toLowerCase();
        if (Math.random() > KI_INTELLIGENCE) {
            return false;
        }
        return binaryWordsSearch(word);
    }
    function binaryWordsSearch(word, isStart) {
        let key = true;
        let left = 0;
        let right = words.length;
        while(right - left > 1 && key){
            let mid = Math.floor((left + right) / 2);
            let wordNew;
            if(isStart){
                if(words[mid] === word){
                    wordNew = false;
                }else {
                    wordNew = words[mid].slice(0, word.length);
                }
            }else{
                wordNew = words[mid];
            }

            if(wordNew === word){
                key = false;
                return true;
            }
            if(wordNew > word){
                right = mid;
            }else{
                left = mid;
            }
        }
        return false;

    }

    function deleteWordFromArray(word, array) {
        let i = array.indexOf(word);
        array.splice(i, 1);
        return array;

    }

    function isWordStartInDictionary(word) {
        return binaryWordsSearch(word.toLowerCase(), true);
    }

    function isWordEndInDictionary(word) {
        word = word.toLowerCase();
        for(let i = 0; i < words.length; i++){
            if(word === words[i]) continue;
            if(word === words[i].substr(-word.length)) {
                return true;
            }
        }

        return false;
    }
    let MAX_POINTS = 0;
    let LAST_POINTS = 0;
    let rememberedLastResult = [];
    let rememberedWords = [];
    let MAX_RESULT = [];
    let RESULT_LETTERS = {};
    let MAX_RESULT_LETTERS = {};

    let addedWords = getFromStorage("addedWords");
    let deletedWords = getFromStorage("deletedWords");

    function changeWordsDictionary(){
        try{
            let newCopy = mainWordsCopy.slice();
            if(addedWords){
                for(let i = 0; i < addedWords.length; i++){
                    if(!newCopy.includes(addedWords[i])) newCopy.push(addedWords[i]);
                }
            }
            if(deletedWords){
                for(let i = 0; i < deletedWords.length; i++){
                    let ind = newCopy.indexOf(deletedWords[i]);
                    if(ind !== -1) newCopy.splice(ind, 1);
                }
            }
            words = newCopy;
            sortWords();
        }catch(e){}

    }

    if(addedWords) {
        addedWords = JSON.parse(addedWords);
    }
    else addedWords = [];
    if(deletedWords) {
        deletedWords = JSON.parse(deletedWords);
    }
    else deletedWords = [];
    changeWordsDictionary();
    function sortWords(){
        words = words.sort((a,b) => a.localeCompare(b));
    }

    sortWords();

    let game = new Vue({
        el: '.game',
        data: {
            menu: true,
            levels: false,
            sizes: false,
            content: false,
            field: [],
            playerLetters: [],
            selectedLetterOnField: '',
            allLetters: [],
            botStroke: false,
            showEndGame: false,
            usedWords: [],
            botLetters: [],
            newLettersIndexes: [],
            newBotLettersIndexes: [],
            playerScore: 0,
            botScore: 0,
            botInterval: 0,
            result: 1,
            aiMoving: false,
            isEnding: false,
            size: 15,
            interval: 0,
            tipMessage: 'Подсказка',
            showBadTip: false,
            showGoodTip: false,
            isTwo: false,
            selectedLetters: [],
            ngame: 0,
            letters_x2: [],
            passMove: 0,
            letters_x3: [],
            words_x2: [],
            words_x3: [],
            isEnd: false,
            passStroke: false,
            rules: false,
            allMyWords: 0,
            futureScore: 0,
            allMyLetters: 0,
            save: !!save,
            allBotWords: 0,
            allBotLetters: 0,
            changeMode: false,
            fieldBlackout: false,
            showPlayerMessage: false,
            isInterval : false,
            contentBlackout: false,
            bottomBlackout: false,
            addInterval: 0,
            strokes: 0,
            isDict: false,
            dictInput: '',
            addedWords: addedWords,
            deletedWords: deletedWords,
            inputAddSelected: true
        },
        methods: {
            toggleRules(){
                this.rules = !this.rules;
            },
            selectInput(bool){
              this.inputAddSelected = bool;
            },
            toggleDict(){
                this.isDict = !this.isDict;
            },
            getDictWords(){
              if(this.inputAddSelected) return this.addedWords;
              return this.deletedWords;
            },
            deleteWord(word){
                word = word.toLowerCase();
                console.log('del word ', this.inputAddSelected);
                if(this.inputAddSelected){
                    addedWords = deleteWordFromArray(word, this.addedWords);
                    this.addedWords = addedWords;
                    setToStorage('addedWords', JSON.stringify(this.addedWords));

                } else{
                    deletedWords = deleteWordFromArray(word, this.deletedWords);
                    this.deletedWords =  deletedWords
                    setToStorage('deletedWords', JSON.stringify(this.deletedWords));
                }
                changeWordsDictionary();
                saveData();
            },
            addWordToAdded(){
                if(!/^[а-яА-Я]+$/g.test(this.dictInput)) return;
                let word = this.dictInput.toLowerCase();
                if(!this.addedWords.includes(word) && !this.deletedWords.includes(word)){
                    this.addedWords.push(word);
                }
                this.dictInput = '';
                addedWords = this.addedWords;
                changeWordsDictionary();
                setToStorage('addedWords', JSON.stringify(this.addedWords));
                saveData();
            },
            addWordToDeleted(){
                if(!/^[а-яА-Я]+$/g.test(this.dictInput)) return;
                let word = this.dictInput.toLowerCase();
                if(!this.addedWords.includes(word) && !this.deletedWords.includes(word)){
                    this.deletedWords.push(word);
                }
                this.dictInput = '';
                deletedWords = this.deletedWords;
                changeWordsDictionary();
                setToStorage('deletedWords', JSON.stringify(this.deletedWords));
                saveData();
            },
            start(){
                this.menu = false;
                if(this.isTwo){
                    this.openSizes(1)
                }else{
                    this.openLevels();
                }
            },
            openLevels(){
                this.levels = true;

            },
            openSizes(ki){
                this.levels = false;
                this.sizes = true;
                KI_INTELLIGENCE = ki;
            },
            startGame(size){
                if(showAdv && advTime){
                    showAdv();
                }
                this.size = size;
                this.createField();
                this.playerScore = 0;
                this.botScore = 0;
                this.passMove = 0;
                this.allMyWords = 0;
                this.allMyLetters = 0;
                this.allBotWords = 0;
                this.allBotLetters = 0;
                this.futureScore = 0;
                this.strokes = 0;
                this.botLetters = [];
                this.playerLetters = [];
                this.usedWords = [];
                this.newLettersIndexes = [];
                this.selectedLetterOnField = '';
                this.save = false;
                this.isEnd = false;
                this.rules = false;
                this.changeMode = false;
                this.isInterval  = false;
                this.passStroke  = false;
                this.showPlayerMessage = false;
                this.sizes = false;
                this.levels = false;
                this.botStroke = false;
                this.showEndGame = false;
                let shuffledLetters = [];
                for(let i = 0; i < lettersCount[this.size].length; i++){
                    for(let q = 0; q < lettersCount[this.size][i][1]; q++){
                        shuffledLetters.push(lettersCount[this.size][i][0]);
                    }
                }
                this.letters_x2 = letters_x2[this.size].slice();
                this.letters_x3 = letters_x3[this.size].slice();
                this.words_x2 = words_x2[this.size].slice();
                this.words_x3 = words_x3[this.size].slice();
                shuffle(shuffledLetters);
                this.allLetters = shuffledLetters;
                this.bottomBlackout = false;
                this.fieldBlackout = false;
                this.contentBlackout = false;
                this.menu = false;
                this.selectedLetters = [];
                this.content = true;
                this.getLettersToPlayers();
                this.setRandWord();
                this.getFirstTip();
                if(this.isTwo){
                    params({'Doubles': 1});
                    this.showPlayerMessage = true;
                }
            },
            closePlayerMessage(){
                this.strokes++;
                this.showPlayerMessage = false;
                let pL = this.playerLetters.slice();
                this.selectedLetters = [];
                this.playerLetters = this.botLetters.slice();
                this.botLetters = pL;

            },
            getLettersToPlayers() {
                for(let i = 0; i < 7; i++){
                    let rand = Math.floor(this.allLetters.length * Math.random());
                    this.botLetters.push(this.allLetters[rand]);
                    this.allLetters.splice(rand, 1);
                    rand = Math.floor(this.allLetters.length * Math.random());
                    this.playerLetters.push(this.allLetters[rand]);
                    this.allLetters.splice(rand, 1);
                }
            },
            changeShowBadTip(tip) {
                this.tipMessage = tip;
                this.showGoodTip = false;
                this.showBadTip = true;
                clearTimeout(this.interval);
                this.interval = setTimeout(() => {
                    this.showBadTip = false;
                }, 1200)
            },
            changeShowGoodTip(tip){
                this.tipMessage = tip;
                this.showGoodTip = true;
                this.showBadTip = false;
                clearTimeout(this.interval);
                this.interval = setTimeout(()=>{
                    this.showGoodTip = false;
                }, 1200);
            },
            setRandWord(){
                let word = words[Math.floor(Math.random() * words.length)];
                if(word.length === words_length[this.size]){
                    let startIndex = Math.floor(this.size/2) - Math.floor(word.length/2);
                    for(let i = 0; i  < word.length; i++){
                        this.field[Math.floor(this.size/2)]
                            .splice(i + startIndex, 1, word[i].toUpperCase());
                    }
                    this.usedWords.push(word.toLowerCase());
                }else return this.setRandWord();

            },
            getExtra(row, col, isClass){
                let extraClass = row + "-" + col;
                if(words_x2[this.size].includes(extraClass)) return isClass ? 'word_x2' : ['2X', 'СЛОВО'];
                if(words_x3[this.size].includes(extraClass)) return isClass ?'word_x3' : ['3X', 'СЛОВО'];
                if(letters_x2[this.size].includes(extraClass)) return isClass ? 'letter_x2' : ['2X', 'БУКВА'];
                if(letters_x3[this.size].includes(extraClass)) return isClass ? 'letter_x3' : ['3X', 'БУКВА'];
                if(Math.floor(this.size/2) === row && Math.floor(this.size/2) === col) return isClass ? 'middle' : false;
                return false;
            },
            getLetterScore(letter){
                return lettersScore[letter.toUpperCase()];
            },


            changeLetters(){
                if(this.isEnd) return;
                this.selectedLetterOnField = '';
                this.changeMode = !this.changeMode;
                if(this.changeMode){
                    this.returnAllLetters();
                    this.bottomBlackout = true;
                    this.fieldBlackout = true;
                    this.tipMessage = 'Выберите буквы,' +
                        ' которые хотите заменить, а затем нажмите на кнопку "Вперёд".';
                }else{
                    this.selectedLetters = [];
                    this.bottomBlackout = false;
                    this.fieldBlackout = false;
                    this.getFirstTip();
                }
                this.testPlayerMove(false);
            },
            returnAllLetters(){
                for(let i = this.newLettersIndexes.length-1; i >= 0; i--){
                    let [row, col] = this.getRowAndColl(this.newLettersIndexes[i]);
                    this.playerLetters.push(this.field[row][col]);
                    this.field[row].splice(col, 1, '');
                    this.newLettersIndexes.splice(i, 1);
                }
                this.testPlayerMove(false);
            },
            returnLetter(){
                if(this.selectedLetterOnField === '') return;
                let [row, col] = this.getRowAndColl(this.selectedLetterOnField);
                this.playerLetters.push(this.field[row][col]);
                this.selectedLetterOnField = '';
                this.field[row].splice(col, 1, '');
                this.newLettersIndexes.splice(
                    this.newLettersIndexes.indexOf(row + '-' + col), 1);
                this.testPlayerMove(false);
            },
            testConnections(){
                let newLetters = this.newLettersIndexes.slice();
                let mid = Math.floor(this.size/2);
                let gotLetters = [];
                gotLetters.push(mid + '-' + mid);
                this.testRecursiveConnection(mid, mid, newLetters, gotLetters);
                return newLetters.length === 0;
            },
            testRecursiveConnection(row, col, newLetters, gotLetters){
                let str = row + '-' + col;
                let index = newLetters.indexOf(str);
                if(index !== -1) newLetters.splice(index, 1);
                if(newLetters.length === 0) return true;
                let l1 = (row-1) + '-' + col;
                if(row-1 !== -1 && !gotLetters.includes(l1) && this.field[row-1][col] !== '') {
                    gotLetters.push(l1);
                    this.testRecursiveConnection(row-1, col, newLetters, gotLetters);
                }
                let l2 = (row+1) + '-' + col;
                if(row+1 !== this.size && !gotLetters.includes(l2) && this.field[row+1][col] !== '') {
                    gotLetters.push(l2);
                    this.testRecursiveConnection(row+1, col, newLetters, gotLetters);
                }
                let l3 = row + '-' + (col-1);
                if(col-1 !== -1 && !gotLetters.includes(l3) && this.field[row][col-1] !== '') {
                    gotLetters.push(l3);
                    this.testRecursiveConnection(row, col-1, newLetters, gotLetters);
                }
                let l4 = row + '-' + (col+1);
                if(col+1 !== this.size && !gotLetters.includes(l4) && this.field[row][col+1] !== '') {
                    gotLetters.push(l4);
                    this.testRecursiveConnection(row, col+1, newLetters, gotLetters);
                }

            },
            getFirstTip(){
                this.tipMessage = 'Нажмите на букву в руке, а затем на ячейку, в которую хотите поместить букву.';
            },
            createField(){
                let f = [];
                for(let i = 0; i < this.size; i++){
                    f.push([]);
                    for(let q = 0; q < this.size; q++){
                        f[i].push('');
                    }
                }
                this.field = f;
            },
            getRowAndColl(str){
                let ind = str.indexOf('-');
                let row = Number(str.substr(0, ind));
                let col = Number(str.substr(ind+1));
                return [row, col];
            },
            addLetterToField(row, col){
                if(this.isEnd) return;
                if(last[1] === (row + '-' + col) && new Date() - last[0] < 400){
                    this.returnLetterFromField(row, col);
                    this.testPlayerMove(false);
                    return;
                }
                last = [new Date(), row +'-'+col];

                if(this.newLettersIndexes.includes(row + '-' + col)
                    && this.selectedLetterOnField === '' && this.selectedLetters.length !== 1){

                    this.selectedLetterOnField = row + '-' + col;
                    this.selectedLetters = [];
                }else{
                    //Убрать выделение буквы на поле
                    if(this.selectedLetterOnField === row + '-' + col){
                        this.selectedLetterOnField = '';
                        this.testPlayerMove(false);
                        return;
                    }
                    if(this.changeMode || (this.selectedLetters.length !== 1 && this.selectedLetterOnField === '')) {
                        this.testPlayerMove(false);
                        return;
                    }
                    if(this.field[row][col] !== '' &&
                        !this.newLettersIndexes.includes(row + '-' + col)) return;
                    this.tipMessage = 'Чтобы вернуть букву в руку, щёлкните по ней два раза или нажмите на неё один раз, а затем на блок с вашими буквами. ';
                    //Если выбрана буква на поле
                    let l = this.field[row][col];
                    if(this.selectedLetterOnField !== ''){
                        let [row2, col2] = this.getRowAndColl(this.selectedLetterOnField);
                        this.field[row].splice(col, 1, this.field[row2][col2]);
                        //Если несколько букв на поле, меняем местами
                        if(this.newLettersIndexes.includes(row + '-' + col)){
                            this.field[row2].splice(col2, 1, l);
                        }else{
                            this.field[row2].splice(col2, 1, '');
                            let index = this.newLettersIndexes.indexOf(row2 + '-' + col2);
                            this.newLettersIndexes.splice(index, 1);
                            this.newLettersIndexes.push(row + '-' + col);
                        }

                        this.selectedLetterOnField = '';
                        this.testPlayerMove(false);
                        return;
                    }
                    this.field[row].splice(col, 1, this.playerLetters[this.selectedLetters[0]]);
                    this.playerLetters.splice(this.selectedLetters[0], 1);
                    if(this.newLettersIndexes.includes(row + '-' + col)){
                        this.playerLetters.push(l);
                    }else{
                        this.newLettersIndexes.push(row + '-' + col);
                    }

                    this.selectedLetters = [];
                    this.selectedLetterOnField = '';


                }
                this.testPlayerMove(false);
            },
            returnLetterFromField(row, col){
                if(this.newLettersIndexes.includes(row + '-' + col)){
                    this.newLettersIndexes.splice(
                        this.newLettersIndexes.indexOf(row + '-' + col), 1
                    );
                    this.selectedLetterOnField = '';
                    this.playerLetters.push(this.field[row][col]);
                    this.field[row].splice(col, 1, '');
                }
                this.testPlayerMove(false);
            },
            nextLevel(){
                if(this.isEnd || this.isInterval) return;
                if(this.changeMode){
                    if(this.selectedLetters.length === 0 )return;
                    let length = this.selectedLetters.length;
                    //Сортировка по убыванию
                    this.selectedLetters.sort(function (a, b) {
                        return b - a;
                    });
                    let newPlLets = [];
                    for(let i = 0; i < length && this.allLetters.length > 0; i++){
                        let rand = Math.floor(this.allLetters.length * Math.random());
                        newPlLets.push(this.allLetters[rand]);
                        this.allLetters.splice(rand, 1);
                    }
                    for(let i = 0; i < this.selectedLetters.length; i++){
                        this.allLetters.push(this.playerLetters[this.selectedLetters[i]]);
                        this.playerLetters.splice(this.selectedLetters[i], 1);
                    }
                    this.passMove++;
                    this.selectedLetters = [];
                    this.addInterval = setTimeout(()=>{
                        for(let i = 0; i < newPlLets.length; i++){
                            this.playerLetters.push(newPlLets[i]);
                        }
                        this.changeLetters();
                        this.nextStroke();
                    }, 1000);
                    if(this.isTwo){
                        this.newBotLettersIndexes = [];
                    }
                    this.futureScore = 0;
                    return;
                }
                //Проверка слов
                else if(this.newLettersIndexes.length > 0){
                    if(!this.testPlayerMove(true)){
                        return;
                    };
                }else{
                    this.passMove++;
                    this.passStroke = true;
                    this.futureScore = 0;
                    return;
                }

                this.nextStroke();

                this.futureScore = 0;

            },
            testPlayerMove(doMove){
                //Проверка всех соединений
                let isConnected = this.testConnections();
                if(!isConnected){
                    if(!doMove){
                        this.futureScore = 0;
                        return;
                    }
                    this.changeShowBadTip("Все буквы должны быть соединены друг с другом, а также с центральным словом.");
                    return false;
                }

                let stored_letters_x2 = this.letters_x2.slice();
                let stored_letters_x3 = this.letters_x3.slice();
                let stored_words_x2 = this.words_x2.slice();
                let stored_words_x3 = this.words_x3.slice();
                let {gotWords, sumWords, arrSumWords} = this.countAllLetters(this.newLettersIndexes);
                if((new Set(gotWords)).size !== gotWords.length){
                    if(!doMove){
                        this.futureScore = 0;
                        this.letters_x2 = stored_letters_x2;
                        this.letters_x3 = stored_letters_x3;
                        this.words_x2 = stored_words_x2;
                        this.words_x3 = stored_words_x3;
                        return;
                    }
                    this.changeShowBadTip("В игре могут быть только различные слова.");
                    this.letters_x2 = stored_letters_x2;
                    this.letters_x3 = stored_letters_x3;
                    this.words_x2 = stored_words_x2;
                    this.words_x3 = stored_words_x3;
                    return false;
                }
                let notWords = "";
                let usedWord = "";
                let raz = 0;
                for(let i = 0; i < gotWords.length; i++){
                    if(this.usedWords.includes(gotWords[i].toLowerCase())){
                        usedWord = gotWords[i];
                    }
                    if(
                        (!words.includes(gotWords[i].toLowerCase()) && !this.addedWords.includes(gotWords[i].toLowerCase()))
                        || this.deletedWords.includes(gotWords[i].toLowerCase())

                        ){
                        if(raz > 0){
                            notWords +=  ', ';
                        }
                        notWords += '"' + gotWords[i].toLowerCase() + '"';
                        raz++;
                    }
                }

                if(usedWord !== ""){
                    if(!doMove){
                        this.futureScore = 0;
                        this.letters_x2 = stored_letters_x2;
                        this.letters_x3 = stored_letters_x3;
                        this.words_x2 = stored_words_x2;
                        this.words_x3 = stored_words_x3;
                        return;
                    }
                    this.changeShowBadTip("Слово " + '"' + usedWord.toUpperCase() + '"' +
                        " уже было использовано.");
                    this.letters_x2 = stored_letters_x2;
                    this.letters_x3 = stored_letters_x3;
                    this.words_x2 = stored_words_x2;
                    this.words_x3 = stored_words_x3;
                    return false;
                }
                if(notWords !== ""){
                    if(!doMove){
                        this.futureScore = 0;
                        this.letters_x2 = stored_letters_x2;
                        this.letters_x3 = stored_letters_x3;
                        this.words_x2 = stored_words_x2;
                        this.words_x3 = stored_words_x3;
                        return;
                    }
                    this.changeShowBadTip("К сожалению, " + notWords.toUpperCase() + (raz === 1 ? ' не найдено' : ' не найдены' ) +
                        " в словаре. Попробуйте собрать новые слова.");
                    this.letters_x2 = stored_letters_x2;
                    this.letters_x3 = stored_letters_x3;
                    this.words_x2 = stored_words_x2;
                    this.words_x3 = stored_words_x3;
                    return false;
                }else{

                    if(!doMove){
                        let plus15 = this.newLettersIndexes.length === 7 ? 15 : 0;
                        this.futureScore = sumWords + plus15;
                        this.letters_x2 = stored_letters_x2;
                        this.letters_x3 = stored_letters_x3;
                        this.words_x2 = stored_words_x2;
                        this.words_x3 = stored_words_x3;
                        return;
                    }
                    if(!this.isTwo || (this.isTwo && this.strokes % 2 === 1)){
                        this.allMyWords += gotWords.length;
                        this.allMyLetters += this.newLettersIndexes.length;
                        this.playerScore += sumWords;
                    }else{
                        this.allBotWords += gotWords.length;
                        this.allBotLetters += this.newLettersIndexes.length;
                        this.botScore += sumWords;
                    }

                    this.selectedLetterOnField = '';
                    let str = '';
                    for(let i = 0; i < gotWords.length; i++){
                        this.usedWords.push(gotWords[i].toLowerCase());
                        str += gotWords[i].toUpperCase() + ' +' + arrSumWords[i]  + '. ';
                    }
                    this.passMove = 0;
                    if(this.newLettersIndexes.length === 7){
                        if(!this.isTwo || (this.isTwo && this.strokes % 2 === 1)){
                            this.playerScore += 15;
                        }else{
                            this.botScore += 15;
                        }

                        str += " (+15 за 7 букв)";
                        str += "(+" +(sumWords+15) + ").";
                    }else{
                        str += "(+" +sumWords + ").";
                    }
                    this.selectedLetters = [];
                    if(this.isTwo){
                        this.newBotLettersIndexes = this.newLettersIndexes.slice();
                    }
                    this.newLettersIndexes = [];
                    this.changeShowGoodTip(str);

                    //добавить буквы
                    this.addLettersToPlayer(this.playerLetters);
                    return true;
                }
                return false;

            },
            nextStroke(){
                if(this.testEnd()){
                    return;
                }
                this.isInterval = true;
                if(this.isTwo){
                    this.botInterval = setTimeout(()=>{
                        this.showPlayerMessage = true;
                        this.isInterval = false;
                        if(showAdv && advTime){
                            showAdv();
                        }
                    }, 2000);
                }else{
                    this.botStroke = true;
                    this.botInterval = setTimeout(()=>{
                        this.botMove();
                        if(showAdv && advTime){
                            showAdv();
                        }
                    }, 500);
                }
            },
            doPassStroke(){
                this.passStroke = false;
                if(this.isTwo){
                    if(this.testEnd()){
                        return;
                    }
                    this.showPlayerMessage = true;
                }else{
                    this.nextStroke();
                }


            },
            closePassStroke(){
                this.passStroke = false;
            },
            testEnd(){
                if(this.passMove >= 6 || (this.allLetters.length === 0 && this.playerLetters.length === 0 && this.botLetters.length === 0)){
                    this.isEnd = true;
                    this.showEndGame = true;
                    this.contentBlackout = true;
                    this.save = false;
                    save = '';
                    deleteFromStorage('save');
                    this.tipMessage = 'Игра окончена. Вы можете зафиксировать ваш результат, а затем вернуться в меню и начать новую игру.';
                    return true;
                }
                return false;
            },
            testIndexWithDoneLetter(indexes, index){
                let [row, col] = this.getRowAndColl(index);
                if(row > 0 && this.field[row-1][col] !== ''
                    && !indexes.includes(row-1 + '-' + col)) return 'top';

                if(row < this.field.length - 1 && this.field[row+1][col] !== ''
                    && !indexes.includes(row+1 + '-' + col)) return 'top';

                if(col > 0 && this.field[row][col-1] !== ''
                    && !indexes.includes(row + '-' + (col-1))) return 'left';

                if(col < this.field.length - 1 && this.field[row][col+1] !== ''
                    && !indexes.includes(row + '-' + (col+1))) return 'left';

                return false;
            },
            countAllLetters(indexesVar, isTest){
                let gotWords = [];
                let arrSumWords = [];
                let sumWords = 0;
                let usedLettersRow = [];
                let usedLettersCol = [];
                //Sort indexes
                let indexes1 = [];
                let indexesNav = [];
                let indexes2 = [];
                indexesVar.forEach((index)=>{
                    let nav = this.testIndexWithDoneLetter(indexesVar, index);
                   if(nav){
                       indexes1.push(index);
                       indexesNav.push(nav);
                   }else{
                       indexes2.push(index);
                   }
                });
                let indexes = indexes1.concat(indexes2);
                
                for(let i = 0; i < indexes.length; i++){
                    let [row, col] = this.getRowAndColl(indexes[i]);
                    let rowI = row;
                    let colI = col;
                    let navIndex = indexes1.indexOf(indexes[i]);
                    let nav;
                    
                    
                    let that = this;

                    function rowFunc() {
                        //Строка
                        colI = col;
                        rowI = row;

                        while(rowI >= 0 && that.field[rowI][colI] !== ''){
                            rowI--;
                        }
                        rowI++;
                        if(rowI < that.size-1 && (that.field[rowI+1] && that.field[rowI+1][colI] !== '')){
                            let obj = that.countWord(rowI, colI, true, usedLettersRow, usedLettersCol, isTest);
                            if(obj.word.length > 1){
                                gotWords.push(obj.word.toLowerCase());
                                sumWords += obj.sum;
                                arrSumWords.push(obj.sum);
                            }
                        }
                    }
                    function colFunc() {
                        //Столбец
                        colI = col;
                        rowI = row;
                        while(colI >= 0 && that.field[rowI][colI] !== ''){
                            colI--;
                        }
                        colI++;
                        if(colI < that.size-1 && (that.field[rowI] && that.field[rowI][colI+1] !== '')){
                            let obj = that.countWord(rowI, colI, false, usedLettersRow, usedLettersCol, isTest);
                            if(obj.word.length > 1){
                                gotWords.push(obj.word.toLowerCase());
                                sumWords += obj.sum;
                                arrSumWords.push(obj.sum);
                            }
                        }
                    }

                    if(navIndex !== -1){
                        nav = indexesNav[navIndex];
                    }
                    if(nav === 'top'){
                        if(!usedLettersRow.includes(indexes[i])){
                            rowFunc();
                        }
                        if(!usedLettersCol.includes(indexes[i])){
                            colFunc();
                        }
                    }else{
                        if(!usedLettersCol.includes(indexes[i])){
                            colFunc();
                        }
                        if(!usedLettersRow.includes(indexes[i])){
                            rowFunc();
                        }
                    }



                }
                return {gotWords: gotWords, sumWords: sumWords, arrSumWords: arrSumWords};
            },
            addLettersToPlayer(letters){
                while(letters.length !== 7 && this.allLetters.length > 0){
                    let rand = Math.floor(Math.random() * this.allLetters.length);
                    letters.push(this.allLetters[rand]);
                    this.allLetters.splice(rand, 1);
                }
            },
            countWord(row, col, isChangeRow, usedLettersRow, usedLettersCol, isTest){

                let word = "";
                let sum = 0;
                let wordKoef = 1;
                while(row <= this.size-1 && col <= this.size-1 && this.field[row][col] !== ''){
                    word += this.field[row][col];
                    let str = row + "-" + col;
                    if(usedLettersRow && isChangeRow) usedLettersRow.push(str);
                    else if(usedLettersCol) usedLettersCol.push(str);
                    let letterKoef = 1;
                    if(this.letters_x2.includes(str)){
                        letterKoef = 2;
                        if(!isTest) this.letters_x2.splice(this.letters_x2.indexOf(str), 1);
                    }else if(this.letters_x3.includes(str)){
                        letterKoef = 3;
                        if(!isTest) this.letters_x3.splice(this.letters_x3.indexOf(str), 1);
                    }
                    if(this.words_x2.includes(str)){
                        wordKoef *= 2;
                        if(!isTest)  this.words_x2.splice(this.words_x2.indexOf(str), 1);
                    }else if(this.words_x3.includes(str)){
                        wordKoef *= 3;
                        if(!isTest) this.words_x3.splice(this.words_x3.indexOf(str), 1);
                    }
                    sum += letterKoef * this.getLetterScore(this.field[row][col]);
                    if(isChangeRow) row++;
                    else col++;
                }
                sum *= wordKoef;
                return {word: word, sum : sum};
            },
            closeEnd(){
                this.showEndGame = false;
                this.contentBlackout = false;
            },
            selectLetter(index){
                if(this.isEnd) return;
                if(this.selectedLetterOnField !== ''){
                    this.returnLetter();
                    return;
                }
                if(this.changeMode){
                    let ind = this.selectedLetters.indexOf(index);
                    if(ind !== -1){
                        this.selectedLetters.splice(ind, 1);
                    }else{
                        this.selectedLetters.push(index);
                    }
                }else{
                    this.selectedLetterOnField = '';
                    this.selectedLetters = [];

                    this.selectedLetters.push(index);
                }
            },
            returnMenu(){
                this.saveGame();
                this.ngame++;
                clearTimeout(this.interval);
                clearTimeout(this.addInterval);
                clearTimeout(this.botInterval);
                this.content = false;
                this.sizes = false;
                this.levels = false;
                this.menu =true;
            },
            //Ход бота
            botMove() {
                MAX_POINTS = 0;
                LAST_POINTS = 0;
                MAX_RESULT = [];
                rememberedLastResult = [];
                rememberedWords = [];
                RESULT_LETTERS = {};
                MAX_RESULT_LETTERS = {};
                this.newBotLettersIndexes = [];
                this.ai();
                if(MAX_POINTS > 0){
                    for(let i = 0; i < rememberedLastResult.length; i++){
                        this.newBotLettersIndexes.push(rememberedLastResult[i]);
                    }

                    let {gotWords, sumWords, arrSumWords} = this.countAllLetters(this.newBotLettersIndexes);
                    let str = '';
                    for(let i = 0; i < gotWords.length; i++){
                        this.usedWords.push(gotWords[i].toLowerCase());
                        str += gotWords[i].toUpperCase() + " +" + arrSumWords[i] + '. '
                    }
                    this.passMove = 0;
                    this.botScore += sumWords;

                    if(this.newBotLettersIndexes.length === 7){
                        this.botScore += 15;
                        str += ' + 15 за 7 букв ';
                        str += ' (+' + (sumWords + 15) + ').';
                    }else{
                        str += ' (+' + sumWords + ').';
                    }
                    this.tipMessage = "Ход Бота: " + str;
                    this.addLettersToPlayer(this.botLetters);
                    this.allBotWords += gotWords.length;
                    this.allBotLetters += this.newBotLettersIndexes.length;
                }else{
                    this.passMove++;
                    this.botChangeLetters();
                    this.tipMessage = "Бот меняет буквы."
                }
                this.testEnd();
                this.botStroke = false;
                this.isInterval = false;
            },
            ai(){
                //Ищем возможные клетки по горизонтали;
                let freeRowCellsStart = [];
                let freeRowWordStart = [];


                let freeRowCellsEnd = [];
                let freeRowWordEnd = [];

                for(let i = 0; i < this.size; i++){
                    for(let q = 0; q < this.size; q++){
                        if(this.field[i][q] !== '') continue;
                        //Есть ли конец слова
                        let wordEnd = '';
                        if(q !== this.size-1 && this.field[i][q+1] !== ''){
                            let newQ = q+1;
                            while(newQ < this.size && this.field[i][newQ] !== ''){
                                wordEnd += this.field[i][newQ];
                                newQ++;
                            }
                            if(isWordEndInDictionary(wordEnd)) {
                                freeRowCellsEnd.push(i + '-' + q);
                                freeRowWordEnd.push(wordEnd);
                            }
                        }
                        let wordStart = '';
                        if(q !== 0 && this.field[i][q-1] !== ''){
                            let newQ = q-1;
                            while(newQ >= 0 && this.field[i][newQ] !== ''){
                                wordStart += this.field[i][newQ];
                                newQ--;
                            }
                            if(isWordStartInDictionary(wordStart)) {
                                freeRowCellsStart.push(i + '-' + q);
                                freeRowWordStart.push(wordStart);
                            }
                        }
                    }
                }
                //Ищем возможные клетки по вертикали;
                let freeColumnCellsStart = [];
                let freeColumnWordsStart = [];

                let freeColumnCellsEnd = [];
                let freeColumnWordsEnd = [];
                for(let i = 0; i < this.size; i++) {
                    for (let q = 0; q < this.size; q++) {
                        if (this.field[i][q] !== '') continue;
                        //Есть ли конец слова
                        let wordEnd = '';
                        if (i !== this.size - 1 && this.field[i + 1][q] !== '') {
                            let newI = i + 1;
                            while (newI < this.size && this.field[newI][q] !== '') {
                                wordEnd += this.field[newI][q];
                                newI++;
                            }
                            if (isWordEndInDictionary(wordEnd)) {
                                freeColumnCellsEnd.push(i + '-' + q);
                                freeColumnWordsEnd.push(wordEnd);
                            }
                        }
                        //Есть ли начало слова
                        let wordStart = '';
                        if (i !== 0 && this.field[i - 1][q] !== '') {
                            let newI = i - 1;
                            while (newI >= 0 && this.field[newI][q] !== '') {
                                wordStart += this.field[newI][q];
                                newI--;
                            }
                            if (isWordStartInDictionary(wordStart)) {
                                freeColumnCellsStart.push(i + '-' + q);
                                freeColumnWordsStart.push(wordStart);
                            }
                        }
                    }
                }
                this.startTest(freeRowCellsStart, freeRowWordStart, 0);
                this.startTest(freeRowCellsEnd, freeRowWordEnd, 1);
                this.startTest(freeColumnCellsStart, freeColumnWordsStart, 2);
                this.startTest(freeColumnCellsEnd, freeColumnWordsEnd, 3);
                if(MAX_POINTS > 0 && MAX_POINTS > LAST_POINTS){

                    for(let i = 0; i < MAX_RESULT.length; i++){
                        let cur = MAX_RESULT_LETTERS[MAX_RESULT[i]];
                        let [row, col] = this.getRowAndColl(MAX_RESULT[i]);
                        this.field[row].splice(col, 1, cur);
                        this.botLetters.splice(this.botLetters.indexOf(cur),1);
                    }
                    rememberedLastResult = rememberedLastResult.concat(MAX_RESULT.slice());
                    let {gotWords} = this.countAllLetters(MAX_RESULT, true);
                    for(let i = 0; i < gotWords.length; i++){
                        rememberedWords.push(gotWords[i].toLowerCase());
                    }
                    if(KI_INTELLIGENCE > 0.6 && this.botLetters.length > 0){
                        LAST_POINTS = MAX_POINTS;
                        this.ai();
                    }


                }
            },
            startTest(cells, words, mode){
                for(let i = 0; i < cells.length; i++){
                    let [row, col] = this.getRowAndColl(cells[i]);
                    this.testFreeRowCells(row, col, words[i], this.botLetters.slice(), mode);
                }
                this.newBotLettersIndexes = [];
            },
            //0 col++
            //1 col--
            //2 row++
            //3 row--
            testFreeRowCells(row, col, word, letters, mode){
                if(
                    (
                        (mode === 0 && col < this.size)
                        || (mode === 1 && col >= 0)
                        || (mode === 2 && row < this.size)
                        || (mode === 3 && row >= 0)
                    )
                    && this.field[row][col] === '' && letters.length > 0

                ){
                    for(let i = 0; i < letters.length; i++){
                        this.newBotLettersIndexes.push(row + '-' + col);
                        RESULT_LETTERS[row + '-' + col] = letters[i];
                        this.field[row][col] = letters[i];

                        let newWord;
                        if(mode === 0 || mode === 2){
                            newWord = word + letters[i]
                        }else{
                            newWord = letters[i] + word;
                        }


                        if((isWordInDictionary(newWord) && !this.deletedWords.includes(newWord)) || this.addedWords.includes(newWord)){
                            let {gotWords, sumWords} = this.countAllLetters(this.newBotLettersIndexes, true);
                            let key = true;
                            for(let i = 0; i < gotWords.length; i++){
                                if(!words.includes(gotWords[i])
                                    || this.usedWords.includes(gotWords[i].toLowerCase())
                                    || rememberedWords.includes(gotWords[i].toLowerCase())){
                                    key = false;
                                    break;
                                }
                            }
                            if((new Set(gotWords)).size !== gotWords.length) key = false;
                            let res = sumWords + LAST_POINTS;
                            if(
                                KI_INTELLIGENCE > 0.6
                                || (KI_INTELLIGENCE < 0.3 && res < 20)
                                || (KI_INTELLIGENCE > 0.3 && res < 30)
                            ){
                                if(key && res > MAX_POINTS && (new Set(gotWords)).size === gotWords.length){
                                    MAX_POINTS = res;
                                    MAX_RESULT = this.newBotLettersIndexes.slice();
                                    MAX_RESULT_LETTERS = JSON.parse(JSON.stringify(RESULT_LETTERS));
                                }
                            }

                        }

                        if(
                            ((mode === 0 || mode === 2) && isWordStartInDictionary(newWord))
                            ||
                            ((mode === 1 || mode === 3) && isWordEndInDictionary(newWord))){
                            let newLetters = letters.slice();
                            newLetters.splice(i, 1);

                            if(mode === 0) this.testFreeRowCells(row, col+1, newWord, newLetters, mode);
                            if(mode === 1) this.testFreeRowCells(row, col-1, newWord, newLetters, mode);
                            if(mode === 2) this.testFreeRowCells(row+1, col, newWord, newLetters, mode);
                            if(mode === 3) this.testFreeRowCells(row-1, col, newWord, newLetters, mode);
                        }
                        this.newBotLettersIndexes.splice(
                            this.newBotLettersIndexes.indexOf(row + '-' + col), 1);
                        this.field[row][col] = '';

                    }
                }

            },
            botChangeLetters(){
                let bt = this.botLetters.length;
                for (let i = 0; i < bt; i++) {
                    this.allLetters.push(this.botLetters.pop());
                }
                this.addLettersToPlayer(this.botLetters);
            },
            getRightWord(num, isWord){
                let wordsArr = [['слово', 'слова', 'слов'], ['букву', 'буквы', 'букв']];
                let str = String(num);
                str = Number(str[str.length-1]);
                if(num < 20 && num > 4){
                    return num + ' ' + (isWord ? wordsArr[0][2] : wordsArr[1][2]);
                }else if(str === 1){
                    return num + ' ' + (isWord ? wordsArr[0][0] : wordsArr[1][0]);
                }else if(str >= 2 && str < 5){
                    return num + ' ' + (isWord ? wordsArr[0][1] : wordsArr[1][1]);
                }
                return num + ' ' + (isWord ? wordsArr[0][2] : wordsArr[1][2]);
            },
            saveGame(){
                if(this.isEnd || !this.content) return;
                let obj = {};
                if(this.isTwo){
                    obj.strokes = this.strokes;
                }
                obj.isTwo = this.isTwo;
                obj.passMove = this.passMove;
                obj.allLetters = this.allLetters.slice();
                obj.playerLetters = this.playerLetters.slice();
                obj.botLetters = this.botLetters.slice();
                obj.size = this.size;
                obj.usedWords = this.usedWords;

                obj.words_x2 = this.words_x2.slice();
                obj.words_x3 = this.words_x3.slice();
                obj.letters_x2 = this.letters_x2.slice();
                obj.letters_x3 = this.letters_x3.slice();

                obj.ki = KI_INTELLIGENCE;

                obj.playerScore = this.playerScore;
                obj.botScore = this.botScore;

                obj.allBotWords = this.allBotWords;
                obj.allBotLetters = this.allBotLetters;

                obj.allMyWords = this.allMyWords;
                obj.allMyLetters = this.allMyLetters;
                let f = JSON.parse(JSON.stringify(this.field));
                for(let i = 0; i < this.size; i++){
                    for(let q = 0; q < this.size; q++){
                        if(this.newLettersIndexes.includes(i + '-' + q)){
                            obj.playerLetters.push(this.field[i][q]);
                            f[i][q] = '';
                        }
                    }
                }
                obj.field = f;

                save = obj;
                this.save = true;
                setToStorage('save', JSON.stringify(obj));
            },
            getSave(){
                if(showAdv && advTime){
                    showAdv();
                }
                this.menu = false;
                this.content = true;
                this.getFirstTip();
                this.size = save.size;
                this.isTwo = save.isTwo;
                if(this.isTwo){
                    this.strokes = save.strokes;
                }
                this.playerLetters = save.playerLetters.slice();
                if(this.playerLetters.length > 7){
                    this.playerLetters.length = 7;
                }

                this.botLetters = save.botLetters.slice();
                if(save.allLetters){
                    this.allLetters = save.allLetters.slice();
                }
                if(save.usedWords){
                    this.usedWords = save.usedWords.slice();
                }
                if(save.passMove){
                    this.passMove = save.passMove;
                }else{
                    this.passMove = 0;
                }


                KI_INTELLIGENCE = save.ki;

                this.playerScore = save.playerScore;
                this.botScore = save.botScore;

                this.allBotWords = save.allBotWords;
                this.allBotLetters = save.allBotLetters;


                this.allMyWords = save.allMyWords;
                this.allMyLetters = save.allMyLetters;

                this.field = JSON.parse(JSON.stringify(save.field));

                this.words_x2 = save.words_x2.slice();
                this.words_x3 = save.words_x3.slice();
                this.letters_x2 = save.letters_x2.slice();
                this.letters_x3 = save.letters_x3.slice();

                this.newLettersIndexes = [];
                this.newBotLettersIndexes = [];
                this.selectedLetters = [];
                this.selectedLetterOnField = '';
            }

        },
        mounted: function () {
            this.$nextTick(function () {
                document.querySelector(".start").remove();
                document.querySelector(".game").classList.remove('none');
            })
        }
    });
    window.onblur = game.saveGame;
    window.onbeforeunload = game.saveGame;
    window.onpagehide = game.saveGame;
    //Перемешивание
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let t = array[i];
            array[i] = array[j];
            array[j] = t;
        }
    }
    let gamePlayer;
    function saveData() {
        try{
            if (gamePlayer) {
                const state = {
                    gameProgress: {
                        addedWords: game.addedWords, deletedWords: game.deletedWords
                    }
                };
                if(gamePlayer) gamePlayer.setData(state).then((ignored) => {}).catch(()=>{});
            }
        }catch (ignored) {}
    };
    function initPlayer(ysdk) {
        ysdk.getPlayer().then(_player => {
            // Игрок авторизован.
            gamePlayer = _player;
            gamePlayer.getData(['gameProgress'], false).then((data) => {
                const gp = data.gameProgress;
                console.log('date', gp);
                if(gp){
                    if(gp.addedWords) game.addedWords = gp.addedWords;
                    if(gp.deletedWords) game.deletedWords = gp.deletedWords;
                }else{
                    saveData();
                }
            }).catch((e) => {console.log(e)});
        }).catch((e) => {
            console.log(e);
        });
    }

    if(window.YaGames){
        YaGames.init({
            adv: {

            }
        }).then(ysdk => {

            var isNativeCache = ysdk.yandexApp && ysdk.yandexApp.enabled;
            if ('serviceWorker' in navigator && !isNativeCache) {
                window.onload = function () {
                    navigator.serviceWorker
                        .register('sw.js')
                        .then(function (reg) {
                            console.log('Registration succeeded. Scope is ' + reg.scope);
                        })
                        .catch(function (error) {
                            console.error('Trouble with sw: ', error);
                        });
                };
            }

            showAdv = () => {
                advTime = false;
                ysdk.adv.showFullscreenAdv();
                setTimeout(()=>{
                    advTime = true;
                }, 220000);
            };
            initPlayer(ysdk);
        });
    }
};