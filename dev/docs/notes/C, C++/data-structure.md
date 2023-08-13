---
title: 資料結構
date: 2023-08-13
giscus: false
---
## 圖(Graph) 問題
### 題目
> 請根據所輸入的圖內容，找出圖上**最多**的節點組合，使得此組合內的任兩點在圖上沒有共用邊存在，並印出此組合所包含的節點個數。此程式需能不斷地讀入圖內容，並根據圖內容印出最多組合的節點個數。

<CodeGroup>
<CodeGroupItem title="輸入input" active>

```cpp
9 // 節點數量
0 1 0 0 0 1 0 0 0 // 鄰接矩陣 adjacency matrix
1 0 0 1 0 0 0 1 0
0 0 0 0 1 0 0 0 0
0 1 0 0 0 1 1 0 1
0 0 1 0 0 1 0 0 0
1 0 0 1 1 0 0 0 0
0 0 0 1 0 0 0 0 1
0 1 0 0 0 0 0 0 1
0 0 0 1 0 0 1 1 0
```

</CodeGroupItem>

<CodeGroupItem title="輸出output">

```cpp
4
```

</CodeGroupItem>
</CodeGroup>

> ![graph1](/img/docs/graph1.png)
當我們選擇節點 0、節點 4、節點 6、節點 7 時，此時有最多的組合，<br/>
此組合所包含的節點個數為 4，且均沒有共用邊存在

### 程式碼 
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
  
## 迷宮問題
### 題目
> 請根據所輸入的迷宮內容(包括迷宮層數、大小、迷宮圖、一起始點以及一終點)，
請顯示所有有可能的路徑(simple paths)數目(可往上、下、左或右方向走訪，以
及往上下層移動)，此程式需能不斷輸入迷宮內容，並顯示其所有有可能的路徑
數目，直到輸入的迷宮大小邊長小於或等於 0。
PS. Simple path 為一路徑，且路徑中的節點不會重複。

<CodeGroup>
<CodeGroupItem title="輸入input" active>

```cpp
3 6 7 // 3 層 6X7 的迷宮
1 1 1 1 1 1 1 // 1 代表障礙，不能走過去，0 代表可通行
1 0 0 0 0 0 1
1 0 1 1 1 0 1
1 0 1 1 0 0 1
1 1 1 1 0 1 1
1 1 1 1 1 1 1
1 1 1 1 1 1 1
1 1 1 1 1 1 1
1 1 1 1 1 1 1
1 1 1 0 1 1 1
1 1 1 0 0 0 1
1 1 1 1 1 1 1
1 1 1 1 1 1 1
1 1 1 1 1 1 1
1 1 1 1 1 1 1
1 1 0 1 1 1 1
1 1 1 1 1 0 1
1 1 1 1 1 1 1
1 1 1 // 起始點(層 列 行)
3 4 5 // 終點(層 列 行)
0 0 0 // 代表不再輸入其他迷宮，程式結束
```

</CodeGroupItem>
<CodeGroupItem title="輸出output">

```cpp
1
```

</CodeGroupItem>
<CodeGroupItem title="備註">

```cpp
// 有可能的路徑如下所示(不須列印)：
//  * 代表可行走之路徑位置， S 代表起點， D 代表終點。
1 1 1 1 1 1 1 // 1 代表障礙，不能走過去，0 代表可通行
1 S * * * * 1
1 0 1 1 1 * 1
1 0 1 1 * * 1
1 1 1 1 * 1 1
1 1 1 1 1 1 1

1 1 1 1 1 1 1
1 1 1 1 1 1 1
1 1 1 1 1 1 1
1 1 1 0 1 1 1
1 1 1 0 * * 1
1 1 1 1 1 1 1

1 1 1 1 1 1 1
1 1 1 1 1 1 1
1 1 1 1 1 1 1
1 1 0 1 1 1 1
1 1 1 1 1 D 1
1 1 1 1 1 1 1
```

</CodeGroupItem>
</CodeGroup>

### 程式碼  
::: details 完整程式碼
```cpp
#include <iostream>
#include <vector>
using namespace std;

struct Point {
	int layer, row, col;
};

Point move[6] = { {0, -1, 0}, {0, 1, 0}, {0, 0, -1}, {0, 0, 1}, {1, 0, 0}, {-1, 0, 0} };// 上 下 左 右 下層 上層

int Layer, Row, Col;

bool isvalid(vector<vector<vector<char>>> maze, Point pos) {// 判斷位置是否合法

	if (pos.layer < 0 || pos.layer >= Layer || pos.row < 0 || pos.row >= Row || pos.col < 0 || pos.col >= Col) {// 超出範圍
		return false;
	}
	if (maze[pos.layer][pos.row][pos.col] != '0') {// 以拜訪過或障礙物
		return false;
	}
	return true;
}

void print(vector<vector<vector<char>>> maze) {
	cout << string(2 * Row + 1, '-') << endl;
	for (int x = 0; x < Layer; x++) {
		for (int y = 0; y < Row; y++) {
			for (int z = 0; z < Col; z++) {
				cout << maze[x][y][z] << " ";
			}
			cout << endl;
		}
		cout << endl;
	}
	cout << string(2 * Row + 1, '-') << endl;
}

void dfs(vector<vector<vector<char>>> maze, Point pos, Point end, int& path) {// 遞迴搜索迷宮

	if (pos.layer == end.layer && pos.row == end.row && pos.col == end.col) {// 到達出口
		path++;
		//print(maze);
		return;
	}
	for (int x = 0; x < 6; x++) {// 嘗試向6個方向移動

		Point nextpos = { pos.layer + ::move[x].layer, pos.row + ::move[x].row, pos.col + ::move[x].col };

		if (isvalid(maze, nextpos)) {// 如果新位置合法 就繼續遞迴搜索
			maze[nextpos.layer][nextpos.row][nextpos.col] = '*'; // 標記為已拜訪
			//print(maze);
			dfs(maze, nextpos, end, path);
			maze[nextpos.layer][nextpos.row][nextpos.col] = '0'; // 恢復為未拜訪
		}
	}
	return;
}

int main() {
	while (cin >> Layer >> Row >> Col) {
		if (Layer <= 0 || Row <= 0 || Col <= 0) break;

		vector<vector<vector<char>>> maze(Layer, vector<vector<char>>(Row, vector<char>(Col)));

		for (int x = 0; x < Layer; x++) {
			for (int y = 0; y < Row; y++) {
				for (int z = 0; z < Col; z++) {
					cin >> maze[x][y][z];
				}
			}
		}

		Point Start, End;
		cin >> Start.layer >> Start.row >> Start.col;
		cin >> End.layer >> End.row >> End.col;
		Start.layer--;
		End.layer--;

		int path = 0;// 計數器   
		if (maze[Start.layer][Start.row][Start.col] == '0' && maze[End.layer][End.row][End.col] == '0') {
			maze[Start.layer][Start.row][Start.col] = '*';
			dfs(maze, Start, End, path);
		}

		cout << path << endl;
	}
	return 0;
}
```
:::

---

## 鏈結串列 - 二元樹
### 題目
> 請設計一程式，此程式可以不斷地輸入多組測試資料，每組測試資料為若干節點的集合，各節點間以 white space (空白字元)分隔，每組測試資料最後以”()”代表該組測試資料的結束。此程式持續輸入資料直到測試資料不包括任何節點資料為止(即只有”()”)。請根據各組測試資料判斷是否可以構成一棵二元樹，如果輸入的各組測試資料可以構成一個二元樹的話，請輸出此二元樹**後序走訪**後的結果，如果輸入的節點無法合理構成一個二元樹的話，請輸出 wrong data。 
#### 輸入輸出範例
<CodeGroup>
<CodeGroupItem title="輸入input" active>

```cpp
(11,LL) (7,LLL) (2,LLL) (8,R) (10,R) ()
(5,) (4,L) (13,LR) (11,LL) (8,R) (4,RL) (7,RR) ()
()
```

</CodeGroupItem>

<CodeGroupItem title="輸出output">

```cpp
wrong data // 由於輸入資料有問題，因此輸出 wrong data
11 13 4 4 7 8 5
```

</CodeGroupItem>
</CodeGroup>

每個括號為一節點資訊，即 (節點數值,位置)，位置以根節點(root)開始計算，R為前往右子節點，L為前往左子節點

> ![tree](/img/docs/tree.png)

### 程式碼
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


## 網路中心
### 題目
> 請設計一程式，此程式可以不斷地輸入一網路資訊，在此我們使用網路節點個數n 以及一圖 G(V,E)來代表一個網路，此圖 G(V,E)使用 adjacency matrix 來表示，
當輸入的網路節點個數n≦0時則程式結束。圖上的節點 u ∈ V 代表網路節點u，圖上的線 (u, v) 則代表節點 u 與節點 v 之間可互相溝通，節點 u 到節點 v的躍距數(以 hop(u, v) 來表示之)在此定義為圖上節點 u至少需要經過多少條線才可到達節點 v 。對每一個節點 u 而言，此節點 u 到網路中其他節點 v 的最長躍距數可以用max hop(u, v)來表示，當一個節點 x 被稱作是網路中心時，此節點的 max hop(x, v) 要 小 於 或 等 於 其 他 節 點 y 的 max hop(y, v) ， 即max hop(x, v) ≦ max hop(y, v) for all y ∈ V。若輸入的網路為一連通網路時，請印出此圖的網路中心節點(可能不只一個點，請依照節點編號由小到大排好)，若輸入的網路不是一個連通網路時(即對於網路中任兩個節點 u, v 而言，兩節點之間不存在一連通路徑)，請印出”disconnected”。 
#### 輸入輸出範例
<CodeGroup>
<CodeGroupItem title="輸入input" active>

```cpp
8 //此行的 8 代表第一張圖上有 8 個點
0 1 1 0 0 0 1 0
1 0 0 0 0 0 1 0
1 0 0 0 1 0 0 0
0 0 0 0 0 1 0 0
0 0 1 0 0 0 0 1//此 adjacency matrix 代表點和點之間有無邊關係存在
0 0 0 1 0 0 0 0
1 1 0 0 0 0 0 1
0 0 0 0 1 0 1 0
9 //此行的 9 代表第二張圖上有 9 個點
0 1 0 0 0 0 0 0 0
1 0 1 0 1 0 0 0 0
0 1 0 1 0 1 0 0 0
0 0 1 0 1 0 0 1 0
0 1 0 1 0 0 1 0 0
0 0 1 0 0 0 0 0 0
0 0 0 0 1 0 0 0 0
0 0 0 1 0 0 0 0 1
0 0 0 0 0 0 0 1 0
0 // 網路節點個數 n≦0 時則程式結束
```

</CodeGroupItem>

<CodeGroupItem title="輸出output">

```cpp
disconnected
2 3 4
```

</CodeGroupItem>
</CodeGroup>

> ![graph2](/img/docs/graph2.png)

### 程式碼
::: details 完整程式碼
```cpp
#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;

struct Queue {
	int *data = NULL;
	int front = -1;
	int rear = -1;
	Queue(int size) {
		data = new int[size];
	}
};

int bfs(Queue Q, int start, vector<vector<int>> graph) {
	vector<int> distance(graph.size(), 0);
	vector<int> visited(graph.size(), false);
	Q.data[++Q.rear] = start;
	visited[start] = true;
	
	while (Q.front < Q.rear) {// 還有東西時
		int node = Q.data[++Q.front]; // 往下一個node	
		//cout << node << ' ';
		for (int x = 0; x < graph[node].size(); x++) {// 當前節點的所有鄰居
			int neighbor = graph[node][x];
			if (!visited[neighbor]) {// 該節點沒去過時
				visited[neighbor] = true;
				distance[neighbor] = distance[node] + 1;// 鄰居離出發點的距離比當前節點都多一步
				Q.data[++Q.rear] = neighbor;// 把該節點放進queue
			}
		}
	}

	if (find(visited.begin(), visited.end(), false) == visited.end()) {// 每個節點都有拜訪過
		vector<int>::iterator it = max_element(distance.begin(), distance.end());
		return *it; // 回傳最大值
	}
	return -1;
}

int main() {
	int node_num;
	while (cin >> node_num) {
		if (node_num <= 0) break;
		vector<vector<int>> graph(node_num);

		for (int x = 0; x < node_num; x++) {
			for (int y = 0; y < node_num; y++) {
				bool neighbor;
				cin >> neighbor;
				if (neighbor) graph[x].push_back(y);
			}
		}
		Queue Q(node_num);
		vector<int> node_max_distance(node_num, 0);

		for (int x = 0; x < node_num; x++) {
			node_max_distance[x] = bfs(Q, x, graph);
		}
		vector<int>::iterator it = min_element(node_max_distance.begin(), node_max_distance.end());

		if (find(node_max_distance.begin(), node_max_distance.end(), -1) != node_max_distance.end()) {
			cout << "disconnected";
		}
		else {
			for (int x = 0; x < node_num; x++) {
				if (node_max_distance[x] == *it) 
					cout << x << ' ';
			}
		}
		cout << endl;

		if (Q.data != NULL)
			delete[] Q.data;
	}
	return 0;
}
```
:::



## 在圖中找一特別樹問題
### 題目
> 請設計一程式，此程式可以不斷地輸入一組連通圖(connected graphs)，每一連通圖皆使用圖節點個數 n 及相對應的 adjacency matrix A (n x n 矩陣)來表示，當輸入的圖節點個數 n≦0 時則程式結束。在每一個 adjacency matrix A 中，A[i,j]=1即表示節點 i 與節點 j 有相鄰的邊，A[i,j]=0 則表示節點 i 與節點 j 之間沒有相鄰的邊。請在圖中找到一棵樹，此樹需經過所有圖中的節點，且在此樹中分支度為1 的節點總數目為最多(在樹中分支度為 1 的節點代表此節點在樹中只有跟一個樹節點相連)，請列印出此樹分支度為 1 的總節點個數。

#### 輸入輸出範例
<CodeGroup>
<CodeGroupItem title="輸入input" active>

```cpp
9 //此行的 9 代表第二張圖上有 9 個點
0 1 1 1 0 0 0 0 0
1 0 0 1 0 0 0 0 0
1 0 0 1 1 1 1 0 0
1 1 1 0 0 1 0 0 0
0 0 1 0 0 1 1 1 0
0 0 1 1 1 0 0 0 1
0 0 1 0 1 0 0 1 0
0 0 0 0 1 0 1 0 1
0 0 0 0 0 1 0 1 0
0 // 圖節點個數 n≦0 時則程式結束
```

</CodeGroupItem>

<CodeGroupItem title="輸出output">

```cpp
6
```

</CodeGroupItem>
</CodeGroup>

> ![graph2](/img/docs/graph3-1.png)
如下所示，此解擁有最多樹分支度為 1 的節點，其分支度為 1
的節點總數為 6
> ![graph2](/img/docs/graph3-2.png)

### 程式碼
::: details 完整程式碼
```cpp
#include<iostream>
#include<vector>
#include<algorithm>
#define MAX(max,min) max > min ? max : min
using namespace std;

struct Queue {
	int* data = NULL;
	int front = -1;
	int rear = -1;
	Queue(int size) {
		data = new int[size];
	}
};
struct Route {
	int node1, node2;
	Route(int a, int  b) { node1 = a, node2 = b; }
};

int bfs(Queue Q, int start, vector<vector<int>> graph) {
	vector<int> visited(graph.size(), false);
	Q.data[++Q.rear] = start;
	visited[start] = true;

	while (Q.front < Q.rear) {// 還有東西時
		int node = Q.data[++Q.front]; // 往下一個node	
		for (int x = 0; x < graph[node].size(); x++) {// 當前節點的所有鄰居
			int neighbor = graph[node][x];
			if (!visited[neighbor]) {// 該節點沒去過時
				visited[neighbor] = true;
				Q.data[++Q.rear] = neighbor;// 把該節點放進queue
			}
		}
	}

	if (find(visited.begin(), visited.end(), false) == visited.end())// 每個節點都有拜訪過
		return 1;
	return 0;
}

vector<vector<Route>> get_Comb_Route(int node_num, vector<Route> route) {
	vector<vector<Route>> comb_route;
	vector<int> mask(route.size(), 1); 
	int sel = node_num - 1; // 選擇的線數量

	for (int x = 0; x < route.size() - sel; x++) // 線的總數 - 選擇的線數量 = 不要的線數量
		mask[x] = 0;

	do {// 排列組合
		vector<Route> temp;// 組合過的元素
		for (int i = 0; i < route.size(); i++) 
			if (mask[i]) temp.push_back(route[i]);
		
		comb_route.push_back(temp);
	} while (next_permutation(mask.begin(), mask.end()));// 往下一個組合

	return comb_route;
}

vector<vector<int>> Route_to_Graph(int node_num, vector<Route> route) {// 線轉圖
	vector<vector<int>> graph(node_num);
	for (int x = 0; x < route.size(); x++) {
		graph[route[x].node1].push_back(route[x].node2);
		graph[route[x].node2].push_back(route[x].node1);
	}
	return graph;
}

int main() {
	int node_num;
	while (cin >> node_num) {
		if (node_num <= 0) break;
		vector<vector<int>> graph(node_num, vector<int>(node_num));

		for (int x = 0; x < node_num; x++) {
			for (int y = 0; y < node_num; y++)
				cin >> graph[x][y];
		}

		vector<Route> route;// 所有的線
		for (int x = 0; x < node_num; x++)
			for (int y = 0; y < node_num; y++)
				if (x < y && graph[x][y])
					route.push_back(Route(x, y));

		vector<vector<Route>> comb_route = get_Comb_Route(node_num, route);
		
		Queue Q(node_num);
		int max = 0;
		for (int x = 0; x < comb_route.size(); x++) {
			vector<vector<int>> graph_temp = Route_to_Graph(node_num, comb_route[x]);
			for (int y = 0; y < node_num; y++) {
				if (bfs(Q, y, graph_temp)) {// 確認是否為treee
					int cnt = 0;
					for (int x = 0; x < graph_temp.size(); x++) {
						if (graph_temp[x].size() == 1) cnt++;// 鄰居只有1個的節點
					}
					max = MAX(max, cnt);
				}
			}
		}

		cout << max << endl;

		if (Q.data != NULL)
			delete[] Q.data;
	}
	return 0;
}
```
:::



## 圖路徑問題
### 題目
> 請設計一程式，此程式可以不斷地輸入一組圖(graph)及圖上的一個節點 s，每一圖皆使用圖節點個數 n 及相對應的(n+1) x n 二維陣列來表示，當輸入的圖節點個數 n≦0 時則程式結束。在每一個(n+1) x n 二維陣列中，包含了一個用來表示節點權重的一維陣列(即 1 x n 陣列)以及用來表示邊關係及邊上權重的二維陣列 A (即 n x n 陣列)。其中 A[i, j] = w (w>0) 即表示節點 i 與節點 j 有相鄰的邊，且邊上權重為 w，A[i, j] = 0 則表示節點 i 與節點 j 之間沒有相鄰的邊。節點 s 則為一個大於等於 0 但小於 n 的值。令 P(u, v)表示一條從節點 u 出發，經過其他節點，最後到達節點 v 的路徑。則我們定義 P(u, v)的總成本為路徑上所經過節點與邊的權重值總和(節點 u 及節點 v 的權重值不計算在內)。請根據輸入的節點 s，找出從節點 s 出發，到所有其他節點的最小路徑權重值總和，並依照節點的順序依序列出其權重值，若有無法到達的節點時則印出 infinity。

#### 輸入輸出範例
<CodeGroup>
<CodeGroupItem title="輸入input" active>

```cpp
6 //此行的 6 代表第一張圖上有 6 個點
5 4 1 7 2 3 //節點 0 到節點 5 的權重值
0 3 0 0 0 2
3 0 5 0 3 1
0 5 0 0 2 0 //此 6 x 6 matrix 代表點和點之間邊關係以及邊上的權重值
0 0 0 0 0 0
0 3 2 0 0 4
2 1 0 0 4 0
5 // 節點 s
0 // 圖節點個數 n≦0 時則程式結束
```

</CodeGroupItem>

<CodeGroupItem title="輸出output">

```cpp
2 1 8 infinity 4 0
```

</CodeGroupItem>
</CodeGroup>

> ![graph2](/img/docs/graph4.png)

### 程式碼
::: details 完整程式碼
```cpp
#include<iostream>
#include<algorithm>
#include<vector>
#define MAXNUM 9999
using namespace std;

vector<int> dijkstra(vector<vector<int>> graph, vector<int> weight, int node_num, int s) {
	vector<int> distance(node_num, MAXNUM);
	vector<int> visited(node_num, 0);
	int node;

	distance[s] = 0;  // 起始節點到自身的距離為 0
	if (count(graph[s].begin(), graph[s].end(), 0) == node_num)// 這個起點沒有鄰居
		return distance;

	for (int x = 0; x < node_num - 1; x++) {// 尋找最短路徑
		int min = MAXNUM;

		for (int y = 0; y < node_num; y++) {// 前往距離最短的路
			if (!visited[y] && distance[y] <= min) {// 沒拜訪過
				min = distance[y];
				node = y;
			}
		}
		visited[node] = 1;

		for (int y = 0; y < node_num; y++) {//  更新最短路徑距離
			if (!visited[y] && graph[node][y]) {// 為拜訪過且存在路徑
				int cost = distance[node] + graph[node][y] + weight[y];// 到目前節點的距離+路徑權重+節點權重
				if (cost < distance[y])
					distance[y] = cost;
			}
		}
	}
	for (int x = 0; x < node_num; x++) {// 扣掉終點的權重
		if (x == s) continue;
		distance[x] -= distance[x] != MAXNUM ? weight[x] : 0;
	}

	return distance;
}

int main() {
	int node_num;
	while (cin >> node_num) {
		if (node_num <= 0) break;
		vector<vector<int>> graph(node_num, vector<int>(node_num));
		vector<int> weight(node_num);

		for (int x = 0; x < node_num; x++)
			cin >> weight[x];
		for (int x = 0; x < node_num; x++) {
			for (int y = 0; y < node_num; y++)
				cin >> graph[x][y];
		}
		int s;
		cin >> s;

		vector<int> distance = dijkstra(graph, weight, node_num, s);

		for (int x = 0; x < node_num; x++) {
			if (distance[x] == MAXNUM)
				cout << "infinity ";
			else
				cout << distance[x] << ' ';
		}
		cout << endl;
	}
	return 0;
}
```
:::
