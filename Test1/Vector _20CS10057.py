# In this python file, only the definations for the magic functions and the basic operations
# for the question segments are provided. There may be the need to add new functions or overload 
# existing ones as per the question requirements.

class Vector:
        
    def __init__(self, *args): 

        # if arg is an int(dimension)
        if isinstance(args[0], int): 
            self._coords = [0]*args[0]

        # if arg is Vector
        if isinstance(args[0], list):
            self._coords = [0]*len(args[0])
            paramList = args[0]
            for i in range(len(paramList)):
                self._coords[i] = paramList[i]

    def __len__(self):
        # return the dimension of the vector
        #raise NotImplementedError
        
        return len(self._coords)

    def __getitem__(self, j):
        # return the jth coordinate of the vector
        #raise NotImplementedError

        # assuming 0-based indexing
        if j > len(self) or j < 0 :
            print("Out of bound error!!!")
            return
        
        return self._coords[j]

    def __setitem__(self, j, val):
        # set the jth coordinate of vector to val
        #raise NotImplementedError
        
        # assuming 0-based indexing
        if j > len(self) or j < 0 :
            print("Out of bound error!!!")
            return
        
        self._coords[j] = val
        return

    def __sub__(self, other):
        #raise NotImplementedError

        diff = Vector(len(self))
        if len(self) != len(other) :
            print("Vectors are not of same dimension!")
            return

        for i in range(len(self)) : 
            diff._coords[i] = self._coords[i] - other._coords[i]
        
        return diff

    def __ne__(self, other):
        # return True if vector differs from other
        #raise NotImplementedError

        if len(self) != len(other) :
            return True
        
        for i in range(len(self)) :
            if self._coords[i] != other._coords[i] :
                return True
        
        return False
    
    def __str__(self):
        # return the string representation of a vector within <>
        #raise NotImplementedError

        stringRep = "<"
        for i in range(len(self)) :
            stringRep = stringRep + str(self._coords[i]) + ","

        stringRep = stringRep + ">"
        return stringRep
    
def main():
    v1 = Vector(5)
    v2 = Vector (7)
    v3 = Vector([1,2,3,4,5])

    # Print the lengths
    print("length of v1: " + str(len(v1)))
    print("length of v2: " + str(len(v2)))
    print("length of v3: " + str(len(v3)))

    # Set v1
    for i in range(len(v1)):
        v1[i] = i*i
    # Print v1 by getting the values
    print("Members of v1: {:s}".format(", ".join([str(s) for s in v1])))

    # Print the value of  v1-v3
    print("Value of v1-v3: ")
    print(v1-v3)

    # Return if vector v1 and v3 are not equal
    print(v1!=v3)

if __name__ == '__main__':
    main()