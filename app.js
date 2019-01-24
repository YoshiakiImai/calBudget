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
var budgetController = (function(){
	
    // some code
			
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
	
	//UICtrl内のDOMstringsをコール
	var DOM = UICtrl.getDOMstrings();
	
	var ctrlAddItem = function(){
		
		// 1. Get the field input data
		var input = UICtrl.getInput();
		console.log(input);
		
		// 2. Add the item to the budget controller
		
		
		// 3. Add the item to the UI
		
		// 4. Calculate the budget
		
		// 5. Display the budget on the UI

	}
	
	//マウスでクリックをした場合
	document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
	
	//エンターキーを押した場合
	document.addEventListener('keypress', function(event) {
		
		if(event.keycode === 13 || event.which === 13){
			ctrlAddItem();
		}
		
	});
	
})(budgetController,UIController);


