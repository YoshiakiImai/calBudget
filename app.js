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
*ユーザーから受け取る入力値は収支の種類と、項目、値段の三つなので
*あらかじめコンストラクターが受け取る関数のパラメータをそれぞれid、description､value
*と設定。コンストラクターの値が分かりやすいようにそれぞれの変数と名前が同一
*/
var budgetController = (function(){
	
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
					type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
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
		
		// 1. Get the field input data
		var input = UICtrl.getInput();
		console.log(input);
		
		// 2. Add the item to the budget controller
		
		
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
