package app.components;
import java.io.IOException;
import java.util.List;

import jakarta.servlet.jsp.JspException;
import jakarta.servlet.jsp.tagext.SimpleTagSupport;


public class EmpViewTag extends SimpleTagSupport {
    private String detailVar;
    private List<EmpEntry> empSource;

    public void setDetailVar(String detailVar) {
        this.detailVar = detailVar;
    }

    public void setempSource(List<EmpEntry> empSource) {
        this.empSource = empSource;
    }

    @Override
    public void doTag() throws JspException, IOException  {
        var context = super.getJspContext();
        var body = super.getJspBody();
        for(var entry : empSource) {
            context.setAttribute(detailVar , entry);
            body.invoke(null);
        }
    }
}