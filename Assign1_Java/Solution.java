import java.util.*;

public class Solution
{
    public static void main(String args[])
    {
        Scanner scan = new Scanner(System.in);
        HashMap<Integer,Entity> entity = new HashMap<>();
        // It will store (unique ID,Entity object) for each entity.
        // Assuming all IDs are positive integers.
        System.out.print("Hi! Welcome to Medicine Social Network.\n");
        boolean exit = false;
        while(!exit)
        {
            System.out.print("How can I help you?\n"
                            +"1 for creating an Entity\n"
                            +"2 for deleting an Entity\n"
                            +"3 for printing Entities\n"
                            +"4 for adding a product to manufacturer\n"
                            +"5 for adding a certain number of copies of a product to shop\n"
                            +"6 for adding an order of a product from customer\n"
                            +"7 for processing an order\n"
                            +"8 to list all purchases made by a customer\n"
                            +"9 to list inventory of a shop\n"
                            +"10 to list products made by a manufacturer\n"
                            +"11 for exit\n"
                            +"Enter your choice : ");
            int choice = scan.nextInt();
            switch(choice)
            {
                case 1 : 
                    createEntity(scan, entity);
                    break;
                case 2 : 
                    deleteEntity(scan, entity);
                    break;
                case 3 : 
                    printEntity(scan, entity);
                    break;
                case 4 : 
                    addManufacturerToProduct(scan, entity);
                    break;
                case 5 : 
                    addCopies(scan, entity);
                    break;
                case 6 : 
                    addOrder(scan, entity);
                    break;
                case 7 : 
                    processOrder(scan, entity);
                    break;
                case 8 : 
                    printPurchasedByCustomer(scan, entity);
                    break;
                case 9 : 
                    printInventoryOfShop(scan, entity);
                    break;
                case 10 : 
                    printProductsByManufacturer(scan, entity);
                    break;
                case 11 : 
                    System.out.println("Thank You for visiting our network\nHope you have liked the experience!");
                    exit = true;
                    break;
                default : 
                    System.out.println("Wrong Choice entered!");
            }
            System.out.println("Done!");
        }
    }
    public static void createEntity(Scanner scan, HashMap<Integer,Entity> entity)
    {
        System.out.print("Enter ID : ");
        int id = scan.nextInt();
        if(entity.containsKey(id))
        {
            System.out.println("ID already exists! Please enter different ID next time.");
            return;
        }
        Types.showTypes(); // printing all types of entities
        int choice = scan.nextInt();
        switch(choice)
        {
            case 1 : 
                entity.put(id, new Manufacturer(id,scan));
                break;
            case 2 : 
                entity.put(id, new Customer(id,scan));
                break;
            case 3 : 
                entity.put(id, new Product(id,scan));
                break;
            case 4 : 
                entity.put(id, new ShopsAndWarehouses(id,scan));
                break;
            case 5 : 
                entity.put(id, new DeliveryAgent(id,scan));
                break;
            default :
                System.out.println("Wrong choice entered!");
        }
    }
    public static void printEntity(Scanner scan, HashMap<Integer,Entity> entity)
    {
        Types.showTypes(); // printing all types of entities
        int choice = scan.nextInt();
        boolean empty = true;
        for(Entity current : entity.values())
        {
            if(current.getType() == choice)
            {
                current.printdetails();
                empty = false;
            }
        }
        if(empty)
        System.out.println("No such entity exists!");
    }
    public static void addCopies(Scanner scan, HashMap<Integer,Entity> entity)
    {
        int shopID, productID, countCopies;
        System.out.print("Enter ID of Shop : ");
        shopID = scan.nextInt();
        System.out.print("Enter ID of Product : ");
        productID = scan.nextInt();
        System.out.print("Enter number of copies of product : ");
        countCopies = scan.nextInt();
        if(!entity.containsKey(shopID))
        {
            System.out.println("Shop doesn't exists!");
            return;
        }
        if(!entity.containsKey(productID))
        {
            System.out.println("Product doesn't exists!");
            return;
        }
        if(entity.get(shopID).getType() != 4)
        {
            System.out.println("Entity refering to entered key doesn't correspond to a Shop");
            return;
        }
        if(entity.get(productID).getType() != 3)
        {
            System.out.println("Entity refering to entered key doesn't correspond to a Product");
            return;
        }
        ShopsAndWarehouses shop = (ShopsAndWarehouses)entity.get(shopID);
        if(shop.inventory.containsKey(productID))
        {
            int earlierCount = shop.inventory.get(productID);
            shop.inventory.put(productID,earlierCount + countCopies);
        }
        else
        shop.inventory.put(productID,countCopies);
    }
    public static void addManufacturerToProduct(Scanner scan, HashMap<Integer,Entity> entity)
    {
        System.out.print("Enter Product ID : ");
        int prodID = scan.nextInt();
        if(!entity.containsKey(prodID)) // if no such entity with given key exists.
        {
            System.out.println("No such Product with given ID exists.");
            return;
        }
        if(entity.get(prodID).getType() != 3)
        {
            System.out.println("Entity refering to entered key doesn't correspond to a Product");
            return;
        }
        System.out.print("Enter ID of manufacturer : ");
        int manuID = scan.nextInt();
        if(!entity.containsKey(manuID)) // if no such entity with given key exists.
        {
            System.out.println("No such Manufacturer with given ID exists.");
            return;
        }
        if(entity.get(manuID).getType() != 1)
        {
            System.out.println("Entity refering to entered key doesn't correspond to a Manufacturer");
            return;
        }
        int result = ((Product)entity.get(prodID)).addManufacturer(manuID);
        if(result == 1) // if operation was successful, ie, Product was not assigned a manufacturer earlier
        ((Manufacturer)entity.get(manuID)).addProduct(prodID);
    }
    public static void addOrder(Scanner scan, HashMap<Integer,Entity> entity)
    {
        System.out.print("Enter ID of customer : ");
        int customerID = scan.nextInt();
        System.out.print("Enter ID of product : ");
        int productID = scan.nextInt();
        if(!entity.containsKey(customerID))
        {
            System.out.println("No such customer with given ID exists.");
            return;
        }
        if(!entity.containsKey(productID))
        {
            System.out.println("No such product with given ID exists.");
            return;
        }
        if(entity.get(customerID).getType() != 2)
        {
            System.out.println("Entity refering to entered key doesn't correspond to a Customer.");
            return;
        }
        if(entity.get(productID).getType() != 3)
        {
            System.out.println("Entity refering to entered key doesn't correspond to a Product");
            return;
        }
        System.out.print("Enter number of copies : ");
        int countCopy = scan.nextInt();
        Customer customer = (Customer)entity.get(customerID);
        customer.addorder(productID,countCopy);
    }
    public static void processOrder(Scanner scan, HashMap<Integer,Entity> entity)
    {
        System.out.print("Enter ID of customer : ");
        int customerID = scan.nextInt();
        System.out.print("Enter ID of product : ");
        int productID = scan.nextInt();
        if(!entity.containsKey(customerID))
        {
            System.out.println("No such customer with given ID exists.");
            return;
        }
        if(!entity.containsKey(productID))
        {
            System.out.println("No such product with given ID exists.");
            return;
        }
        if(entity.get(customerID).getType() != 2)
        {
            System.out.println("Entity refering to entered key doesn't correspond to a Customer.");
            return;
        }
        if(entity.get(productID).getType() != 3)
        {
            System.out.println("Entity refering to entered key doesn't correspond to a Product");
            return;
        }
        Customer customer = (Customer)entity.get(customerID);
        int maxCopyOrdered = customer.countCopiesInPendingOrders(productID); // Total quantity of that product added in cart
        if(maxCopyOrdered == 0)
        {
            System.out.println("You haven't added order for this product.\n"
                                +"First add order, then process it.");
            return;
        }
        System.out.print("You have added "+maxCopyOrdered+" copies of product.\n"
                        +"How many out of them would you like to process? ");
        int processCount = scan.nextInt();
        if(processCount > maxCopyOrdered || processCount<=0)
        {
            System.out.println("Invalid input!");
            return;
        }
        int shopID = searchShop(entity, processCount, productID, customer.zip_code);
        if(shopID < 0) // if couldn't find a suitable shop
        {
            System.out.println("No shop available now for processing your order!");
            return;
        }
        int dboyID = searchDeliveryAgent(entity, customer.zip_code);
        if(dboyID < 0) // if couldn't find a suitable delivery agent
        {
            System.out.println("No Delivery Agent available now for processing your order!");
            return;
        }
        System.out.println("Your Order is processed!");
        ((DeliveryAgent)entity.get(dboyID)).count_product++; // increase count of delivered product
        customer.processingOrder(processCount, productID); // add in customer's purchased order list
        ((ShopsAndWarehouses)entity.get(shopID)).processingOrder(processCount, productID); // decrease available count in shop
    }
    public static int searchShop(HashMap<Integer,Entity> entity, int processCount, int productID, int zipcode) // returns ID of shop
    {
        for(Entity current : entity.values())
        {
            if(current.getType() == 4)
            {
                ShopsAndWarehouses shop = (ShopsAndWarehouses)current;
                if(shop.zip_code == zipcode && shop.inventory.containsKey(productID) && shop.inventory.get(productID) >= processCount)
                {
                    return shop.id;
                }
            }
        }
        return -1;
    }
    public static int searchDeliveryAgent(HashMap<Integer,Entity> entity, int zipcode)
    {
        int minCountDelivered = 1000000000,dboyID = -1;
        for(Entity current : entity.values())
        {
            if(current.getType() == 5)
            {
                DeliveryAgent dboy = (DeliveryAgent)current;
                if(dboy.zip_code == zipcode && dboy.count_product < minCountDelivered) 
                {
                    minCountDelivered = dboy.count_product;
                    dboyID = dboy.id;
                }
            }
        }
        return dboyID;
    }
    public static void printPurchasedByCustomer(Scanner scan, HashMap<Integer,Entity> entity)
    {
        System.out.print("Enter Customer ID : ");
        int customerID = scan.nextInt();
        if(!entity.containsKey(customerID))
        {
            System.out.println("No such customer with given ID exists.");
            return;
        }
        if(entity.get(customerID).getType() != 2)
        {
            System.out.println("Entity refering to entered key doesn't correspond to a Customer.");
            return;
        }
        ((Customer)entity.get(customerID)).printPurchased();
    }
    public static void printInventoryOfShop(Scanner scan, HashMap<Integer,Entity> entity)
    {
        System.out.print("Enter Shop ID : ");
        int shopID = scan.nextInt();
        if(!entity.containsKey(shopID))
        {
            System.out.println("No such shop with given ID exists.");
            return;
        }
        if(entity.get(shopID).getType() != 4)
        {
            System.out.println("Entity refering to entered key doesn't correspond to a Shop.");
            return;
        }
        ((ShopsAndWarehouses)entity.get(shopID)).printInventory();
    }
    public static void printProductsByManufacturer(Scanner scan, HashMap<Integer,Entity> entity)
    {
        System.out.print("Enter Manufacturer ID : ");
        int manuID = scan.nextInt();
        if(!entity.containsKey(manuID))
        {
            System.out.println("No such Manufacturer with given ID exists.");
            return;
        }
        if(entity.get(manuID).getType() != 1)
        {
            System.out.println("Entity refering to entered key doesn't correspond to a Manufacturer.");
            return;
        }
        ((Manufacturer)entity.get(manuID)).printProducts(entity);
    }
    public static void deleteEntity(Scanner scan, HashMap<Integer,Entity> entity)
    {
        Types.showTypes();
        int choice = scan.nextInt();
        switch(choice)
        {
            case 1 :
                deleteManufacturer(scan, entity);
                break;
            case 2 : 
                deleteCustomer(scan, entity);
                break;
            case 3 : 
                deleteProduct(scan, entity);
                break;
            case 4 : 
                deleteShop(scan, entity);
                break;
            case 5 : 
                deleteDeliveryAgent(scan, entity);
                break;
            default : 
                System.out.println("Wrong choice entered!");
        }
    }
    public static void deleteManufacturer(Scanner scan, HashMap<Integer,Entity> entity)
    {
        System.out.println("Following Manufacturers are available : ");
        for(Entity current : entity.values()) 
        {
            if(current.getType() == 1)
            System.out.println("Name : "+current.name+" ID : "+current.id);
        }
        System.out.print("Enter ID of manufacturer which you want to delete : ");
        int manuID = scan.nextInt();
        if((!entity.containsKey(manuID)) || (entity.get(manuID).getType() != 1))
        {
            System.out.println("Wrong ID entered!");
            return;
        }
        Manufacturer manu = (Manufacturer)entity.get(manuID);
        // Assuming that all products manufactured by this manufacturer will also be deleted.
        System.out.println("Following products manufactured by Manufacturer are also getting deleted : ");
        for(int productID : manu.manufacturedProducts)
        {
            System.out.println("Name : " +entity.get(productID).name + " ID : "+entity.get(productID).id);
            deleteProductFromShop(entity, productID); // removing products from all shops
            entity.remove(productID); // removing product
        }
        entity.remove(manuID); // removing manufacturer
    }
    public static void deleteProductFromShop(HashMap<Integer,Entity> entity, int productID)
    {
        for(Entity current : entity.values()) // remove the product from all shops.
        {
            if(current.getType() == 4)
            {
                if(((ShopsAndWarehouses)current).inventory.containsKey(productID))
                ((ShopsAndWarehouses)current).inventory.remove(productID);
            }
        }
    }
    public static void deleteCustomer(Scanner scan, HashMap<Integer,Entity> entity)
    {
        System.out.println("Following Customers are available : ");
        for(Entity current : entity.values()) 
        {
            if(current.getType() == 2)
            System.out.println("Name : "+current.name+" ID : "+current.id);
        }
        System.out.print("Enter ID of Customer which you want to delete : ");
        int customerID = scan.nextInt();
        if((!entity.containsKey(customerID)) || (entity.get(customerID).getType() != 2))
        {
            System.out.println("Wrong ID entered!");
            return;
        }
        entity.remove(customerID);
    }
    public static void deleteProduct(Scanner scan, HashMap<Integer,Entity> entity)
    {
        System.out.println("Following Products are available : ");
        for(Entity current : entity.values()) 
        {
            if(current.getType() == 3)
            System.out.println("Name : "+current.name+" ID : "+current.id);
        }
        System.out.print("Enter ID of Product which you want to delete : ");
        int productID = scan.nextInt();
        if((!entity.containsKey(productID)) || (entity.get(productID).getType() != 3))
        {
            System.out.println("Wrong ID entered!");
            return;
        }
        deleteProductFromShop(entity, productID); // remove the product from all shops.
        // now removing product from set of manufactured product by its manufacturer.
        int manuID = ((Product)entity.get(productID)).manufacturerID;
        ((Manufacturer)entity.get(manuID)).manufacturedProducts.remove(productID);
        // now removing product
        entity.remove(productID);
    }
    public static void deleteShop(Scanner scan, HashMap<Integer,Entity> entity)
    {
        System.out.println("Following Shops are available : ");
        for(Entity current : entity.values()) 
        {
            if(current.getType() == 4)
            System.out.println("Name : "+current.name+" ID : "+current.id);
        }
        System.out.print("Enter ID of Shop which you want to delete : ");
        int shopID = scan.nextInt();
        if((!entity.containsKey(shopID)) || (entity.get(shopID).getType() != 4))
        {
            System.out.println("Wrong ID entered!");
            return;
        }
        entity.remove(shopID);
    }
    public static void deleteDeliveryAgent(Scanner scan, HashMap<Integer,Entity> entity)
    {
        System.out.println("Following DeliveryAgents are available : ");
        for(Entity current : entity.values()) 
        {
            if(current.getType() == 5)
            System.out.println("Name : "+current.name+" ID : "+current.id);
        }
        System.out.print("Enter ID of DeliveryAgent which you want to delete : ");
        int dboyID = scan.nextInt();
        if((!entity.containsKey(dboyID)) || (entity.get(dboyID).getType() != 4))
        {
            System.out.println("Wrong ID entered!");
            return;
        }
        entity.remove(dboyID);
    }
}

class Types // As there is a need to show all types of entities again & again, I have a created a separate class & function which I can simply call when required.
{
    public static void showTypes()
    {
        System.out.print("Enter the type of Entity :- \n"
                        +"1 for Manufacturer \n"
                        +"2 for Customer\n"
                        +"3 for Product\n"
                        +"4 for Shops and Warehouses\n"
                        +"5 for Delivery Agentn\n"
                        +"Enter your choice : ");
    }
}

class Entity
{
    int id;
    String name;
    public Entity(int ID, Scanner scan)
    {
        System.out.print("Enter Name : ");
        this.name = scan.next(); // assuming names of entities consists of single word only
        this.id = ID;
    }
    public int getType() // function overriding
    {
        return 0;
    }
    public void printdetails()
    {
        System.out.println("Name : " + this.name + "\nID : "+this.id);
    }
}

class Manufacturer extends Entity
{
    Set<Integer> manufacturedProducts = new HashSet<>();
    public Manufacturer(int id, Scanner scan)
    {
        super(id, scan);
    }
    public int getType() // assuming Manufacturer is of type 1 among all Entities
    {
        return 1;
    }
    public void addProduct(int productID)
    {
        this.manufacturedProducts.add(productID);
    }
    public void printProducts(HashMap<Integer,Entity> entity)
    {
        if(this.manufacturedProducts.size() == 0)
        {
            System.out.println("No products manufactured by this Manufacturer");
            return;
        }
        for(int productID : this.manufacturedProducts)
        {
            System.out.println("Name : " +entity.get(productID).name + "\nID : "+entity.get(productID).id);
        }
    }
}

class Product extends Entity
{
    int manufacturerID;
    public Product(int id, Scanner scan)
    {
        super(id, scan);
        this.manufacturerID = -1; // manufacturer ID = -1 means manufacturer is not yet assigned to this product.
    }
    public int getType() // assuming Product is of type 3 among all Entities
    {
        return 3;
    }
    public int addManufacturer(int manuID)
    {
        if(this.manufacturerID != -1)
        {
            System.out.println("This product has already been assigned a manufacturer earlier.\n"
                                +"Since manufacturer for a product is unique, cannot add new manufacturer to this product.");
            return -1;
        }
        this.manufacturerID = manuID;
        return 1;
    }
    public void printdetails()
    {
        super.printdetails();
        System.out.println("Manufacturer ID : "+this.manufacturerID);
    }
}

class Customer extends Entity
{
    int zip_code;
    HashMap<Integer,Integer> purchasedProducts = new HashMap<>(); 
    // stores ID,count of all purchased products by a customer.
    HashMap<Integer,Integer> pendingOrder = new HashMap<>();  // similar to "Add to cart"
    // stores ID,count of products of all pending order by a customer.
    public Customer(int id, Scanner scan)
    {
        super(id, scan);
        System.out.print("Enter zip-code : ");
        this.zip_code = scan.nextInt();
    }
    public int getType() // assuming Customer is of type 2 among all Entities
    {
        return 2;
    }
    public void addorder(int productID, int countCopy) // add to cart
    {
        // If product was already present in cart(order added earlier), then increase its count
        // Else just add it. 
        if(this.pendingOrder.containsKey(productID)) 
        {
            int earlierCount = this.pendingOrder.get(productID);
            this.pendingOrder.put(productID,countCopy + earlierCount);
        }
        else
        this.pendingOrder.put(productID,countCopy);
    }
    public int countCopiesInPendingOrders(int productID)
    {
        if(this.pendingOrder.containsKey(productID))
        return this.pendingOrder.get(productID);
        else
        return 0;
    }
    public void processingOrder(int countProcess, int productID)
    {
        int earlierCount = this.pendingOrder.get(productID);
        this.pendingOrder.put(productID,earlierCount - countProcess);
        if(this.purchasedProducts.containsKey(productID))
        earlierCount = this.purchasedProducts.get(productID);
        else
        earlierCount = 0;
        this.purchasedProducts.put(productID,earlierCount + countProcess);
    }
    public void printPurchased()
    {
        for(Map.Entry<Integer,Integer> element : this.purchasedProducts.entrySet())
        {
            System.out.println("Product ID : "+element.getKey()+"\nCount : "+element.getValue());
        }
    }
    public void printdetails()
    {
        super.printdetails();
        System.out.println("Zip code : "+this.zip_code);
    }
}

class ShopsAndWarehouses extends Entity
{
    int zip_code;
    HashMap<Integer,Integer> inventory = new HashMap<>(); // stores productID,count of available copies of products.
    public ShopsAndWarehouses(int id, Scanner scan)
    {
        super(id, scan);
        System.out.print("Enter zip-code : ");
        this.zip_code = scan.nextInt();
        
    }
    public int getType() // assuming Shops & Warehouses are of type 4 among all Entities
    {
        return 4;
    }
    public void processingOrder(int countProcess, int productID)
    {
        int earlierCount = this.inventory.get(productID);
        this.inventory.put(productID,earlierCount - countProcess);
    }
    public void printInventory()
    {
        boolean zero = true;
        for(Map.Entry<Integer,Integer> element : this.inventory.entrySet())
        {
            zero = false;
            System.out.println("Product ID : "+element.getKey()+"\nAvailable Count : "+element.getValue());
        }
        if(zero)
        System.out.println("Nothing is available right now :(");
    }
    public void printdetails()
    {
        super.printdetails();
        System.out.println("Zip code : "+this.zip_code);
    }
}

class DeliveryAgent extends Entity
{
    int zip_code;
    int count_product;
    public DeliveryAgent(int id, Scanner scan)
    {
        super(id, scan);
        System.out.print("Enter zip-code : ");
        this.zip_code = scan.nextInt();
        this.count_product = 0;
    }
    public int getType() // assuming Delivery Agent is of type 5 among all Entities
    {
        return 5;
    }
    public void printdetails()
    {
        super.printdetails();
        System.out.println("Zip code : "+this.zip_code+"\nCount of products delivered : "+this.count_product);
    }
}