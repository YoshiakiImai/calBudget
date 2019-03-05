/*
*calBudgetアプリケーションを3つのモジュールで構成されるよう設計する。
*　１データモジュール　
* 	・新規に入力されたデータを蓄積する
*	・入力の値の演算
*　２ユーザーインターフェイス（UI）モジュール
*	・ユーザーからの入力表示
*	・入力、演算後のUIへの更新情報の表示
*	・更新情報をUIへ表示
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
		inputBtn: '.add__btn',
		incomeContainer: '.income__list',
		expensesContainer: '.expenses__list'
	}
	
	return {
		getInput: function() {
			return{
					type: document.querySelector(DOMstrings.inputType).value, // budgetControllerのaddItemオブジェクトへの収支を決定させる
					description: document.querySelector(DOMstrings.inputDescription).value,
					value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
			};
		},
		
		//HTML初期設定に入力された値を代入する
		addListItem: function(obj, type) {
			var html, newHtml, element;
			
			// HTML初期設定
			if(type === 'inc') {
				element = DOMstrings.incomeContainer;
				html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			} else if (type === 'exp') {
				element = DOMstrings.expensesContainer;
				html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}
			 			
			// 入力された値を代入する
			newHtml = html.replace('%id%', obj.id);
			//IDを書き換えたため新たなHTMLへ入力値を代入
			newHtml = newHtml.replace('%description%', obj.description);
			newHtml = newHtml.replace('%value%', obj.value);
			
			// DOMで指定された収支のコンテイナタグへ代入された値を挿入する
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
			
			
		},
		
		clearFields: function(){
			var fields, fieldsArr;
			
			//DOMstringの収支内容と値を変数fieldsへ格納
			fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
			//fieldsの値を配列fieldsArrヘ呼び出す
			fieldsArr = Array.prototype.slice.call(fields);
			//current.valueの値をnull値へ設定
			fieldsArr.forEach(function(current, index, array){
				current.value = "";
			});
			
			fieldsArr[0].focus();			
		},
		
		//ドキュメントオブジェクトモデルDOMをクロージャーよりパブリックに公開
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
	
	var updateBudget = function(){
		
		// 1. Calculate the budget
		
		// 2. return the budget
		
		// 3. Display the budget on the UI
		
	};
	
	var ctrlAddItem = function(){
		var input, newItem;
		
		// 1. ユーザーインターフェイスのgetInputが返した値をinputへ格納
		input = UICtrl.getInput();
		//ユーザーから入力された場合に
		if(input.description !== "" && !isNaN(input.value) && input.value > 0){
		// 2. 上記inputへ格納されたパラメータのオブジェクトを挿入
		newItem = budgetCtrl.addItem(input.type, input.description, input.value);
		// 3. UICtrlのaddListenItemを呼び出しオブジェクトを引数として収支の種類をinput.typeで判断させ値を返す
		UICtrl.addListItem(newItem, input.type);
		// 4. ユーザーより事前に入力ストアされた値を削除する関数
		UICtrl.clearFields();
		// 5. Calculate and update budget
		updateBudget();
			
		}
		
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
