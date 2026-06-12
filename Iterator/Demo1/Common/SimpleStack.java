package common;
import java.util.Iterator;
public class SimpleStack<V> implements Iterable<V>
{
    class Node
    {
        V item;
        Node below;

        Node(V a)
        {
            item = a;
            below = top;
        }
    }

    private Node top;

    public void push(V sample)
    {
        top = new Node(sample);
    }

    public V pop()
    {
        V sample = top.item;
        top = top.below;
        return sample;
    }

    public boolean empty()
    {
        return top == null;
    }

    public void copy(SimpleStack<? super V> target)
    {
        for(Node n = top; n != null ; n = n.below)
            target.push(n.item);
    }


    public Iterator<V> iterator()
    {
        return new Iterator<V>(){
            private Node current = top;

            public boolean hasNext()
            {
                return current != null;
            }

            public V next()
            {
                V result = current.item;
                current = current.below;
                return result;
            }
        };
    }


}