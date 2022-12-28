#include <bits/stdc++.h>
using namespace std;

#include "pugixml-1.11\src\pugixml.hpp"
using namespace pugi;

class Node // to store attributes of a node element
{
    public :
    string id;
    string name;
    double latitude,longitude;
    double distance; // will use this to find K nearest nodes
};
class Way // to store attributes of a way element
{
    public :
    string id,name;
    vector<string>nodeID;
};
bool operator < (const Node& n1, const Node& n2) // operator overloading for use in priority queue
{
    return n1.distance > n2.distance;
}
bool parseInput(vector<Node>&nodes, vector<Way>&ways)
{
    // Purpose of this function is to parse the data stored in XML file
    // and store all useful information about nodes & ways in vectors.

    xml_document inputfile;
    if(!inputfile.load_file("map.osm")) // if unable to load file
    {
        cout << "Error in loading file" <<endl;
        return false;
    }
    xml_node childTree = inputfile.child("osm");
    string nodeName, attributeName;
    for(auto nodeItr : childTree) // nodeItr belongs to xml_node_iterator
    {
        nodeName = nodeItr.name();
        if(nodeName == "node") // extract all useful information of a node
        {
            Node node;
            for(auto attributeItr : nodeItr.attributes()) // attributeItr belongs to xml_attribute_iterator
            {
                attributeName = attributeItr.name();
                if(attributeName == "id") // ID
                node.id = attributeItr.value();
                else if(attributeName == "lat") // LATITUDE
                node.latitude = stod(attributeItr.value());
                else if(attributeName == "lon") // LONGITUDE
                node.longitude = stod(attributeItr.value());
            }
            for(auto childItr : nodeItr) // Iterate over children of nodeItr
            {
                // extracting name of node(if it exists)
                bool flag = false; 
                vector<string>valname;
                for(auto attributeItr : childItr.attributes())
                {
                    valname.push_back(attributeItr.value());
                }
                if(valname[0] == "name")
                {
                    node.name = valname[1];
                }
            }
            nodes.push_back(node); // push back this Node object to vector
        }
        else if(nodeName == "way")
        {
            Way way;
            for(auto attributeItr : nodeItr.attributes()) // attributeItr belongs to xml_attribute_iterator
            {
                attributeName = attributeItr.name();
                if(attributeName == "id")
                way.id = attributeItr.value();
            }
            for(auto childItr : nodeItr) // Iterate over children of nodeItr
            {
                vector<string>valname;
                for(auto attributeItr : childItr.attributes())
                {
                    if((string)attributeItr.name() == "ref") // IDs of all nodes which are on that way
                    {
                        way.nodeID.push_back(attributeItr.value());
                    }
                    valname.push_back(attributeItr.value());
                }
                if(valname[0] == "name") // extracting name
                {
                    way.name = valname[1];
                }
            }
            ways.push_back(way); // adding Way object to vector
        }
    }
    return true; // parsing successful
}
void searchNode(vector<Node>&nodes)
{
    // Purpose of this function is to search for a node through name 
    // by matching the entered string with substring of node's name
    string nodeName;
    cout << "Enter few letters of name of the node : ";
    cin >> nodeName;
    transform(nodeName.begin(), nodeName.end(), nodeName.begin(), ::tolower); // converting to lower case
    cout << "Following are possible nodes for your search : " << endl;
    bool none = true;
    for(auto node : nodes)
    {
        string name2 = node.name, subname;
        transform(name2.begin(), name2.end(), name2.begin(), ::tolower); // converting to lower case
        for(int i = 0; i + nodeName.size() <= name2.size(); i++) // comparing all possible substrings with nodeName
        {
            subname = name2.substr(i, nodeName.size());
            if(subname == nodeName)
            {
                cout << "Node ID : " << node.id <<" Name : " << node.name << endl;
                none = false;
                break;
            }
        }
    }
    if(none)
    cout << "No node matches with entered string!" << endl;
    cout << "------------------------------------------------------------------------" << endl;
}
void searchWay(vector<Way>&ways)
{
    // Purpose of this function is to search for a way through name 
    // by matching the entered string with substring of way's name
    string wayName;
    cout << "Enter few letters of name of the way : ";
    cin >> wayName;
    transform(wayName.begin(), wayName.end(), wayName.begin(), ::tolower); // converting to lower case
    cout << "Following are possible ways for your search : " << endl;
    bool none = true;
    for(auto way : ways)
    {
        string name2 = way.name, subname;
        transform(name2.begin(), name2.end(), name2.begin(), ::tolower); // converting to lower case
        for(int i = 0; i + wayName.size() <= name2.size(); i++) // comparing all possible substrings with nodeName
        {
            subname = name2.substr(i, wayName.size());
            if(subname == wayName)
            {
                cout << "Way ID : " << way.id <<" Name : " << way.name << endl;
                none = false;
                break;
            }
        }
    }
    if(none)
    cout << "No node matches with entered string!" << endl;
    cout << "------------------------------------------------------------------------" << endl;
}
void searchElement(vector<Node>&nodes , vector<Way>&ways)
{
    // To ask user what he/she wants to search & call functions accordingly
    int choice;
    cout << "Enter 1 to search for a Node, 2 to search for a way : ";
    cin >> choice;
    switch(choice)
    {
        case 1 :
            searchNode(nodes);
            break;
        case 2 : 
            searchWay(ways);
            break;
        default : 
            cout << "Wrong choice!" << endl;
    }
}
void printCount(vector<Node>&nodes , vector<Way>&ways)
{
    // To print count of total nodes & ways
    cout << "------------------------------------------------------------------------" << endl;
    cout << "Total number of nodes : " << nodes.size() << endl;
    cout << "Total number of ways : " << ways.size() << endl;
    cout << "------------------------------------------------------------------------" << endl;
}
double degreeToRadians(double degree)
{
    // to convert angle in degree to radian
    double one_deg = (M_PI) / 180;
    return (one_deg * degree);
}
double findDistance(double lat1, double long1, double lat2, double long2)
{
    //Purpose of this function is to find distance between 2 points given their latitudes & longitudes.

    // first converting angles into radian
    lat1 = degreeToRadians(lat1);
    long1 = degreeToRadians(long1);
    lat2 = degreeToRadians(lat2);
    long2 = degreeToRadians(long2);
    // Using Haversine Formula
    double dlong = long2 - long1;
    double dlat = lat2 - lat1;
 
    double ans = pow(sin(dlat / 2), 2) + cos(lat1) * cos(lat2) * pow(sin(dlong / 2), 2);
    ans = 2 * asin(sqrt(ans));
    // Radius of Earth in
    // Kilometers, R = 6371
    double R = 6371;
    ans = ans * R;
    return ans;
}
void kNearestNodes(vector<Node>&nodes, map<string,Node>mappingNode)
{
    // Purpose of this function is to find K nearest nodes to a given node.
    priority_queue<Node>pque; string nodeID; int k;
    cout << "Enter the ID of node : ";
    cin >> nodeID;
    if(mappingNode.count(nodeID) == 0) // if no such node exists
    {
        cout<<"No such node with given ID exists!" << endl;
        return;
    }
    cout << "Enter value of K : ";
    cin >> k;
    if(k >= nodes.size() || k <= 0) // Invalid value of K
    {
        cout<<"Invalid value of K entered\nValue of K must be in range [1, "<<nodes.size()<<")"<<endl;
        return;
    }
    double lat1 = mappingNode[nodeID].latitude, long1 = mappingNode[nodeID].longitude, lat2, long2;
    for(Node node : nodes) // computing crow-fly distance of every other node & pushing into priority_queue
    {
        if(node.id != nodeID)
        {
            lat2 = node.latitude;
            long2 = node.longitude;
            node.distance = findDistance(lat1,long1,lat2,long2);
            pque.push(node);
        }
    }
    cout << "Following nodes are nearest to given node : " << endl;
    cout << "------------------------------------------------------------------------" << endl;
    for(int i = 0; i < k; i++) // popping K times
    {
        cout << "ID : " << pque.top().id << " ";
        if(pque.top().name.size()) // if name exists
        cout << "Name : " << pque.top().name << " ";
        cout << "Distance : " << pque.top().distance << endl;
        pque.pop();
    }
    cout << "------------------------------------------------------------------------" << endl;
}
void buildGraph(vector<Way>&ways, map<string,Node>&mappingNode, map<string,vector<string>>&adjList,
                             map<pair<string,string>,double> &weight, map<pair<string,string>,string> &wayIDmapping)
{
    // Purpose of this function is to compute every essential thing to find shortest path
    // Constructing adjacency list
    // add weight of edge between node n1-n2 in weight[{n1,n2}] & weight[{n2,n1}]
    string nodeID1,nodeID2; double distance;
    for(Way way : ways)
    {
        for(int i = 1; i < way.nodeID.size(); i++)
        {
            nodeID1 = way.nodeID[i-1];
            nodeID2 = way.nodeID[i];
            distance = findDistance(mappingNode[nodeID1].latitude,mappingNode[nodeID1].longitude, mappingNode[nodeID2].latitude, mappingNode[nodeID2].longitude);
            adjList[nodeID1].push_back(nodeID2);
            adjList[nodeID2].push_back(nodeID1);
            weight[make_pair(nodeID1,nodeID2)] = distance;
            weight[make_pair(nodeID2,nodeID1)] = distance;
            wayIDmapping[make_pair(nodeID1,nodeID2)] = way.id;
            wayIDmapping[make_pair(nodeID2,nodeID1)] = way.id;
        }   
    }
}

struct comparatorFunc // comparator function to use in priority queue
{
    bool operator()(pair<string,double> p1, pair<string,double>p2)
    {
        return p1.second > p2.second;
    }
};
void shortestPath(map<string,Node>&mappingNode, map<string,vector<string>>&adjList, 
                            map<pair<string,string>,double> &weight, map<pair<string,string>,string> &wayIDmapping)
{
    // Purpose of this function is to compute shortest distance 
    // between 2 nodes using dijkstra algorithm
    string nodeID1, nodeID2;
    cout << "Enter ID of source node : ";
    cin >> nodeID2;
    cout << "Enter ID of destination node : ";
    cin >> nodeID1;
    if((!mappingNode.count(nodeID1))||(!mappingNode.count(nodeID2))) // if no such node with given ID exists
    {
        cout << "Invalid Node ID entered!" << endl;
        return;
    }
    // Applying dijkstra algo by considering node1 as source

    map<string,bool> covered; // to store whether a node with given ID is covered or not
    map<string,string> parent; // to store parent(in the path) of a node
    priority_queue< pair<string,double>, vector<pair<string,double>>, comparatorFunc >pque; // custom compare priority queue
    map<string,double> dist; // to store min_distance of each node from source node
    for(auto nodeItr : mappingNode)
    {
        dist[nodeItr.first] = DBL_MAX; // initializing distance to infinity
        covered[nodeItr.first] = false;
        parent[nodeItr.first] = "null";
    }
    dist[nodeID1] = 0; // source node
    parent[nodeID1] = nodeID1;
    pque.push(make_pair(nodeID1,dist[nodeID1]));
    string nearestNodeID;
    while(!pque.empty()) // 4213846707
    {
        nearestNodeID = pque.top().first;
        pque.pop();
        covered[nearestNodeID] = true;
        for(auto neighbour : adjList[nearestNodeID]) // checking for each neighbour of nearestNode
        {
            if((!covered[neighbour]) && (dist[neighbour] > dist[nearestNodeID] + weight[make_pair(neighbour,nearestNodeID)]))
            {
                dist[neighbour] = dist[nearestNodeID] + weight[make_pair(neighbour,nearestNodeID)];
                parent[neighbour] = nearestNodeID;
                pque.push(make_pair(neighbour,dist[neighbour]));
            }
        }
    }
    // Now, using the parent[], generating the whole path
    nearestNodeID = nodeID2;
    double totalDistance = 0; // to store total distance between 2 nodes
    vector<string>path; // will store IDs of all nodes(in sequence) which comes in path
    while(nearestNodeID != nodeID1)
    {
        path.push_back(nearestNodeID);
        totalDistance += weight[make_pair(nearestNodeID, parent[nearestNodeID])];
        nearestNodeID = parent[nearestNodeID];
        if(nearestNodeID == "null") // if no path exists
        {
            cout << "No Path exists between the two nodes!" << endl;
            return;
        }
    }
    path.push_back(nodeID1);
    cout << "Path from source node to destination node : " << endl << endl; // 1961375527 , 1961374932
    for(int i = 1; i < path.size(); i++)
    {
        cout << "From " << path[i-1] << " to " << path[i] <<" a distance of " 
             << weight[make_pair(path[i-1],path[i])] <<" km through the way with ID "  
             << wayIDmapping[make_pair(path[i-1],path[i])] << endl;
        cout << "------------------------------------------------------------------------" << endl;
    }
    cout << endl;
    cout << "------------------------------------------------------------------------" << endl;
    cout << "Total Distance along the ways : " << totalDistance << " km" << endl;
    cout << "------------------------------------------------------------------------" << endl;
}
int main() 
{ 
    vector<Node>nodes; // to store all information of nodes from XML file
    vector<Way>ways; // to store all essential information of ways from XML file

    if(!parseInput(nodes,ways)) // parsing XML file
    return 0; // if failed to parse

    map<string,Node>mappingNode; // mapping from ID to Node
    for(Node node : nodes)
    mappingNode[node.id] = node;

    map<string,vector<string>> adjList; // adjacency list
    map<pair<string,string>, double> weight; // to store distance between nodes
    map<pair<string,string>,string> wayIDmapping; // store ID of way connecting two nodes

    buildGraph(ways,mappingNode,adjList,weight,wayIDmapping);
    // text based user interface
    cout << "Hii!" << endl;
    int choice; bool exit = false;
    while(!exit)
    {
        cout << "How can I help you ? " << endl;
        cout << "Enter 1 to know total number of nodes & ways " << endl;
        cout << "Enter 2 to search for a particular element by name" << endl;
        cout << "Enter 3 to know K nearest nodes to a given node" << endl;
        cout << "Enter 4 to know shortest distance path between two nodes" << endl;
        cout << "Enter 5 to exit" << endl;
        cout << "Enter your choice : ";
        cin >> choice;
        switch(choice)
        {
            case 1 : 
                printCount(nodes, ways);
                break;
            case 2 : 
                searchElement(nodes, ways);
                break;
            case 3 : 
                kNearestNodes(nodes, mappingNode);
                break;
            case 4 : 
                shortestPath(mappingNode, adjList, weight, wayIDmapping);
                break;
            case 5 : 
                exit = true;
                break;
        }
    }
    cout << "Hope you have liked the experience :)" << endl;
    return 0;
}
// 2519625373, 577489943
// 2519625388, 4087857043