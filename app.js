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

	// some code
	
})();

//BudgetControllerとUIControllerを統括するコントロールモジュール
var controller =(function (budgetCtrl, UICtrl){
	
	var ctrlAddItem = function(){
		
		// 1. Get the field input data
		
		// 2. Add the item to the budget controller
		
		// 3. Add the item to the UI
		
		// 4. Calculate the budget
		
		// 5. Display the budget on the UI

		console.log('it works.');
	}
	
	//マウスでクリックをした場合
	document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);
	
	//エンターキーを押した場合
	document.addEventListener('keypress', function(event) {
		
		if(event.key === 13 || event.which === 13){
		ctrlAddItem();
		}
	});
	
})(budgetController,UIController);


