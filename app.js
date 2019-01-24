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

var budgetController = (function(){
	
	var x = 23;
	
	var add = function(a){
		return x + a;
	}
	
	return{
		publicTest: function(b){
			return add(b);
		}
	}
					
})();


var UIController = (function(){

	// some code
	
})();

//BudgetControllerとUIControllerを統括するモジュール
var controller =(function (budgetCtrl, UICtrl){
	
	var z = budgetCtrl.publicTest(5);
	
	return {
		anotherPublic: function() {
			console.log(z);
		}
	}
	
})(budgetController,UIController);


