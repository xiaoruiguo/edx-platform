"""
Class used to write pytest warning data  into html format
"""
import textwrap
import six


class HtmlOutlineWriter(object):
    """
    writer to handle html writing
    """
    STYLE = textwrap.dedent(
        u"""
        .toggle-box{
        display:none;
        }
        .toggle-box + label + div {
            display: none;
        }
        .toggle-box + label:before {
            color: #888;
            width: 10px;
        }

        .toggle-box:checked + label + div {
            margin-left: 3%;
            display: flex;
            flex-direction: column;
        }
        div{
        border-style: solid;
            border-width: 1px 0px 0px 0px;
            border-radius: 3px;
        }

        .location {
        background-color: #edcca9
        }

        body {
        background-color: cornsilk
        }

        .warning_text {
        background-color: #d5b593
        }
        .warning{
        background-color: #bd9f7d
        }
        .num {
        background-color: #a68968;
        }
        .lineno {
        background-color: #a68968;
        }

        }

    """
    )

    HEAD = textwrap.dedent(
        u"""
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="utf-8" />
        <link rel = "stylesheet" type = "text/css" href = "css_default.css" />
        </head>

        <body>
    """
    )

    SECTION_START = textwrap.dedent(
        u"""\
        <div class="{klass}">
        <input class="toggle-box {klass}" id="sect_{id:05d}" type="checkbox">
        <label for="sect_{id:05d}">{html}</label>
        <div>
    """
    )

    SECTION_END = six.u("</div></div>")

    def __init__(self, html_fout, css_fout, css_path):
        self.fout = html_fout
        self.section_id = 0
        self.HEAD = self.HEAD.replace("css_default.css", css_path)
        # writing out style to external css file
        css_fout.write(self.STYLE)
        self.fout.write(self.HEAD)

    def start_section(self, html, klass=None):
        self.fout.write(
            self.SECTION_START.format(id=self.section_id, html=html, klass=klass or "",)
        )
        self.section_id += 1

    def end_section(self):
        self.fout.write(self.SECTION_END)

    def end_body(self):
        self.fout.write("</body>")

    def write(self, html):
        self.fout.write(html)
