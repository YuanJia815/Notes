---
title: 鏈結串列 - 二元樹
date: 2020-10-18
giscus: false
---

### 題目
> 請設計一程式，此程式可以不斷地輸入多組測試資料，每組測試資料為若干節點
的集合，各節點間以 white space (空白字元)分隔，每組測試資料最後以”()”代
表該組測試資料的結束。此程式持續輸入資料直到測試資料不包括任何節點資料
為止(即只有”()”)。請根據各組測試資料判斷是否可以構成一棵二元樹，如果輸
入的各組測試資料可以構成一個二元樹的話，請輸出此二元樹**後序走訪**後的結
果，如果輸入的節點無法合理構成一個二元樹的話，請輸出 wrong data。  
<br/>


```c{2-4,7-8}
程式輸入範例：
(11,LL) (7,LLL) (2,LLL) (8,R) (10,R) ()
(5,) (4,L) (13,LR) (11,LL) (8,R) (4,RL) (7,RR) ()
()
  
  
程式輸出範例：
wrong data // 由於輸入資料有問題，因此輸出 wrong data
11 13 4 4 7 8 5
```
> ![An image](/img/docs/tree.png)
  
  
  
```c
#include<iostream>
#include<string>
#include<vector>
#include<algorithm>
using namespace std;

struct tree {
	int id = -1;
	tree* left = NULL, * right = NULL;
};

void getResult(tree* node, vector<int> &temp) {// 後序走訪
	if (node) {
		getResult(node->left, temp);
		getResult(node->right, temp);	
		temp.push_back(node->id);
	}
}

void deleteTree(tree* node) {
	if (node) {
		deleteTree(node->left);
		deleteTree(node->right);
		delete node;
	}
}

void splitstring(const string& sentense, vector<string>& tokens, const string& s) {// 分割字串
	string::size_type pos1, pos2;
	pos2 = sentense.find_first_of(s);
	pos1 = 0;
	while (sentense.length() > pos2) {
		if (pos2 != pos1) tokens.push_back(sentense.substr(pos1, pos2 - pos1));
		pos1 = pos2 + 1;
		pos2 = sentense.find_first_of(s, pos1);
	}
	if (pos1 != sentense.length())
		tokens.push_back(sentense.substr(pos1));
}

bool list(vector<string> &temp, tree* root) {
	tree* node = NULL;
	for (vector<string>::iterator it = temp.begin(); it != temp.end() - 1; it++) {
		int ID = 0;
		char Dir[10] = "\0";
		sscanf((*it).c_str(), "(%d,%[^)]s", &ID, &Dir);

		node = root;
		for (int x = 0; Dir[x] != '\0'; x++) {
			if (Dir[x] == 'L') {
				if (!node->left)
					node->left = new tree;
				node = node->left;
			} else {
				if (!node->right)
					node->right = new tree;
				node = node->right;
			}
		}	
		if (node->id != -1) return false;
		node->id = ID;
	}
	return true;
}

int main() {
	while (true) {
		string sentense;
		getline(cin, sentense);
		vector<string> tokens(0);
		splitstring(sentense, tokens, " ");
		if (tokens[0] == "()") break;

		tree* root = new tree;
		bool success = list(tokens, root);

		vector<int> result;
		getResult(root, result);
		if (success && find(result.begin(), result.end(), -1) == result.end()) {
			for (int x = 0; x < result.size(); x++) cout << result[x] << " ";
		}
		else cout << "wrong data";
		cout << endl;

		deleteTree(root);
	}
	return 0;
}
```