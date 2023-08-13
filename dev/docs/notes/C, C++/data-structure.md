---
title: 資料結構
date: 2023-08-13
giscus: false
---
## 圖(Graph) 問題
### 題目
> 請根據所輸入的圖內容，找出圖上**最多**的節點組合，使得此組合內的任兩點在圖上沒有共用邊存在，並印出此組合所包含的節點個數。此程式需能不斷地讀入圖內容，並根據圖內容印出最多組合的節點個數。

#### 程式碼範例  
::: details 完整程式碼
```cpp
#include<iostream>
#include<algorithm>
#include<vector>
#define MAX(max, min) max > min ? max : min
using namespace std;

void dfs(int node, vector<vector<int> >graph, vector<bool>&visited, vector<int>& point) {
    visited[node] = true;  
    bool c = 1;
    for (vector<int>::iterator it = graph.at(node).begin(); it != graph.at(node).end(); it++) {
        if (find(point.begin(), point.end(), *it) != point.end() || find(point.begin(), point.end(), node) != point.end())
            c = 0;
    }
    if(c) point.push_back(node);
    for (vector<int>::iterator it = graph.at(node).begin(); it != graph.at(node).end(); it++) {
        if (!visited[*it]) {
            dfs(*it, graph, visited, point);
        }
    }
}
int main() {
    int node;
    while (cin >> node) {
        if (node <= 0) break;
        vector<vector<int> >graph;

        for (int i = 0; i < node; i++) {
            vector<int> neighbor;
            for (int j = 0; j < node; j++) {
                bool tmp;
                cin >> tmp;
                if (tmp) neighbor.push_back(j);
            }
            graph.push_back(neighbor);
        }
        int Max = 0;
        for (int x = 0; x < node; x++) {
            for (int y = 0; y < node; y++) {
                vector<int> point(0, y);
                vector<bool> visited(20, 0);
                dfs(x, graph, visited, point);
                Max = MAX(Max, point.size());
            }
        }
        cout << Max << endl;
    }
    return 0;
} 
```


:::

---
  
## 鏈結串列 - 二元樹
### 題目
> 請設計一程式，此程式可以不斷地輸入多組測試資料，每組測試資料為若干節點的集合，各節點間以 white space (空白字元)分隔，每組測試資料最後以”()”代表該組測試資料的結束。此程式持續輸入資料直到測試資料不包括任何節點資料為止(即只有”()”)。請根據各組測試資料判斷是否可以構成一棵二元樹，如果輸入的各組測試資料可以構成一個二元樹的話，請輸出此二元樹**後序走訪**後的結果，如果輸入的節點無法合理構成一個二元樹的話，請輸出 wrong data。 
### 輸入輸出範例
| 輸入範例 | 輸出範例 |
|------|------|
| (11,LL) (7,LLL) (2,LLL) (8,R) (10,R) () | wrong data |
(5,) (4,L) (13,LR) (11,LL) (8,R) (4,RL) (7,RR) () | 11 13 4 4 7 8 5 |
() |  |

每個括號為一節點資訊，即 (節點數值,位置)，位置以根節點(root)開始計算，R為前往右子節點，L為前往左子節點


```cpp
(11,LL) (7,LLL) (2,LLL) (8,R) (10,R) ()
(5,) (4,L) (13,LR) (11,LL) (8,R) (4,RL) (7,RR) ()
()

wrong data // 由於輸入資料有問題，因此輸出 wrong data
11 13 4 4 7 8 5
```

> ![tree](/img/docs/tree.png)
#### 程式碼範例  
::: details 完整程式碼
```cpp
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
:::


