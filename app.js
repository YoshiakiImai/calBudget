/*
*calBudgetアプリケーションを3つのモジュールで構成されるよう設計する。
*　１ユーザーインターフェイス（UI）モジュール
*	・ユーザーからの入力表示
*	・入力、演算後のUIへの更新情報の表示
*	・更新情報をUIへ表示
*　２データモジュール　
* 	・新規に入力されたデータを蓄積する
*	・入力の値の演算
*　３コントローラーモジュール
* 	・イベント操作の追加
*/

//データモジュール
/*
*ユーザーから受け取る入力値idが識別固有番号、descriptionが項目、valueが収支の値を示す
*ユーザーインターフェイスから入力された値を格納、収支バランスの新規項目を返す
*/
var budgetController = (function(){
	
	//コンストラクタ
    var Expense = function(id, description, value){
		this.id = id;
		this.description = description;
		this.value = value;
	};
	
	 var Income = function(id, description, value){
		this.id = id;
		this.description = description;
		this.value = value;
	};
	//コンストラクタ
	
	//入力された収支と収入の格納配列変数、exp incがallItemsオブジェクト内で生成されて、またtotalsオブジェクトで収支の合計額を格納
	//以上二つのオブジェクトをdataオブジェクト内に格納。
	var data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		}
	};
	
	return{
		addItem: function(type, des, val) {
			var newItem, ID;
			
			//追加される収支項目に付与される識別番号
			//配列の一番後ろをID値を指定して新たなIDを作成
			//初期設定では収支バランスの内容がないためID＝０に設定
			if(data.allItems[type].length > 0) {
				ID = data.allItems[type][data.allItems[type].length - 1].id +　1;	
			} else {
				ID = 0;
			}
			//getInputのtype、収支によって生成されるnewオブジェクトが変化する
			if(type === 'exp'){
				newItem = new Expense(ID, des, val);
			} else if (type === 'inc') {
				newItem = new Income(ID, des, val);
			}			
			
			//上記で生成されたオブジェクトを収支バランスデータの新項目として格納する
			//[type]は収支の種類を判断する
			data.allItems[type].push(newItem);
			//追加された項目を返す
			return newItem;
		},
		
		testing: function() {
			console.log(data);
		}
		
	};
			
})();

//ユーザーインターフェイスモジュール
var UIController = (function(){

	//HTMLとJSを関連付けさせるオブジェクトを生成
	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn'
	}
	
	return {
		getInput: function() {
			return{
					type: document.querySelector(DOMstrings.inputType).value, // budgetControllerのaddItemオブジェクトへの収支を決定させる
					description: document.querySelector(DOMstrings.inputDescription).value,
					value: document.querySelector(DOMstrings.inputValue).value
			};
		},
		
		//DOMをクロージャーよりパブリックに公開
		getDOMstrings: function() {
			return DOMstrings;	
		}
	};
	
})();

//BudgetControllerとUIControllerを統括するコントロールモジュール
var controller =(function (budgetCtrl, UICtrl){
	
	//イベントリスナーをまとめる為の関数
	var setupEventListeners = function() {	
	//UICtrl内のDOMstringsを呼び出し
	var DOM = UICtrl.getDOMstrings();
		
	//マウスでクリックをした場合
	document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
	
	//エンターキーを押した場合
	document.addEventListener('keypress', function(event) {
		
		if(event.keycode === 13 || event.which === 13){
			ctrlAddItem();
		}
	});
	};

	
	var ctrlAddItem = function(){
		var input, newItem;
		
		// 1. ユーザーインターフェイスのgetInputが返した値をinputへ格納
		input = UICtrl.getInput();
		
		
		// 2. 上記inputへ格納されたパラメータの値を挿入
		newItem = budgetCtrl.addItem(input.type, input.description, input.value);
		
		
		// 3. Add the item to the UI
		
		// 4. Calculate the budget
		
		// 5. Display the budget on the UI

	};
	
	//初期化状態を呼び出すための関数
	return{
		init: function(){
			console.log('Application has started.');
			setupEventListeners();
		}	
	};
	
})(budgetController,UIController);

//アプリが開かれるとこの関数が呼び出される
controller.init();
