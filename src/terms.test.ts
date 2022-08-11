import { assertEquals } from "./deps.test.ts";
import { parse } from "./lib.test.ts";
import { extractTerms } from "./terms.ts";

Deno.test("extractTerms works with source extracted from web browser", () => {
  const source = `
  <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/transitional.dtd">
  <HTML lang="en">
  <head>
  <META http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta http-equiv="Pragma" name="Cache-Control" content="no-cache">
  <meta http-equiv="Cache-Control" name="Cache-Control" content="no-cache">
  <LINK REL="stylesheet" HREF="/css/web_defaultapp.css" TYPE="text/css">
  <LINK REL="stylesheet" HREF="/css/web_defaultprint.css" TYPE="text/css" media="print">
  <title>Dynamic Schedule</title>
  <meta http-equiv="Content-Script-Type" name="Default_Script_Language" content="text/javascript">
  <SCRIPT LANGUAGE="JavaScript" TYPE="text/javascript">
  <!-- Hide JavaScript from older browsers 
  window.onunload = function() {submitcount=0;}
  var submitcount=0;
  function checkSubmit() {
  if (submitcount == 0)
     {
     submitcount++;
     return true;
     }
  else
     {
  alert("Your changes have already been submitted.");
     return false;
     }
  }
  //  End script hiding -->
  </SCRIPT>
  <SCRIPT LANGUAGE="JavaScript" TYPE="text/javascript">
  <!-- Hide JavaScript from older browsers 
  //  Function to open a window
  function windowOpen(window_url) {
     helpWin = window.open(window_url,'','toolbar=yes,status=no,scrollbars=yes,menubar=yes,resizable=yes,directories=no,location=no,width=350,height=400');
     if (document.images) { 
         if (helpWin) helpWin.focus()
     }
  }
  //  End script hiding -->
  </SCRIPT>
  </head>
  <body>
  <div class="headerwrapperdiv">
  <div class="pageheaderdiv1">
  <a href="#main_content" onMouseover="window.status='Go to Main Content'; return true" onMouseout="window.status=''; return true" OnFocus="window.status='Go to Main Content'; return true" onBlur="window.status=''; return true" class="skiplinks">Go to Main Content</a>
  <h1>Blinn College</h1></DIV><div class="headerlinksdiv">
  </DIV>
  <table  CLASS="plaintable" SUMMARY="This table displays Menu Items and Banner Search textbox."
           WIDTH="100%">
  <tr>
  <TD CLASS="pldefault">
  <div class="headerlinksdiv2">
  &nbsp;
  </div>
  </TD>
  <TD CLASS="pldefault"><p class="rightaligntext" /p>
  <SPAN class="pageheaderlinks">
  <a href="/wtlhelp/twbhhelp.htm" accesskey="H" onClick="popup = window.open('/wtlhelp/twbhhelp.htm', 'PopupPage','height=500,width=450,scrollbars=yes,resizable=yes'); return false" target="_blank" onMouseOver="window.status='';  return true" onMouseOut="window.status=''; return true"onFocus="window.status='';  return true" onBlur="window.status=''; return true"  class="submenulinktext2">HELP</a>
  |
  <a href="twbkwbis.P_Logout" accesskey="3" class="submenulinktext2">EXIT</a>
  </span>
  </TD>
  </tr>
  </table>
  </DIV>
  <div class="pagetitlediv">
  <table  CLASS="plaintable" SUMMARY="This table displays title and static header displays."
     WIDTH="100%">
  <tr>
  <TD CLASS="pldefault">
  <h2>Schedule Search</h2>
  </TD>
  <TD CLASS="pldefault">
  &nbsp;
  </TD>
  <TD CLASS="pldefault"><p class="rightaligntext" /p>
  <div class="staticheaders">
  </div>
  </TD>
  </tr>
  <tr>
  <TD class="bg3" width="100%" colSpan=3><img src="/wtlgifs/web_transparent.gif" alt="Transparent Image" CLASS="headerImg" TITLE="Transparent Image"  NAME="web_transparent" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=3 WIDTH=10 /></TD>
  </tr>
  </table>
  <a name="main_content"></a>
  </DIV>
  <div class="pagebodydiv">
  <!--  ** END OF twbkwbis.P_OpenDoc **  -->
  <div class="infotextdiv"><table  CLASS="infotexttable" SUMMARY="This layout table contains information that may be helpful in understanding the content and functionality of this page.  It could be a brief set of instructions, a description of error messages, or other special information."><tr><td CLASS="indefault">&nbsp;</td><td CLASS="indefault"><SPAN class="infotext"> <table width="100%" border=".5">
  <tr bgcolor="#99CCFF">
  <td>Method of Instruction</td>
  <td>Definition</td></tr> 
  <tr><td><b>Traditional</b></td>
  <td>Face-to-Face classes that take place on campus at a specific time and location.</td></tr>
  <tr><td><b>Live Online</b></td>
  <td>Live classes are held at scheduled times using Zoom videoconference software.  This method of instruction does not require students to be on-campus.</b></tr>
  <tr><td><b>Flex Online</b></td>
  <td>All class content is posted online with no scheduled class sessions.  This method of instruction does not require students to be on-campus.</tr>
  <tr><td><b>Blended</b></td>
  <td> Students participate in Face-to-Face classes that take place on campus at a specific time and location.  More than ½ of class content is posted online for students with no scheduled class sessions.
  </td>
  <tr><td><b>Blended Zoom</b>
  <td>Students participate in live classes held at scheduled times using Zoom videoconference software.  More than ½ of class content is posted online for students with no scheduled class sessions.
  </tr>
  </table> <br><table border=".5"><tr bgcolor="#99CCFF"><td>Attention:</td></tr>
  <tr><td>Due to possible closures related to the COVID-19 Pandemic, a course modality might be moved completely online during the 
  semester.</td></tr>
  <tr><td>REMOTE - Indicates that a class has a required remote participation and students must login at the designated class time.  Students may complete that portion of the classwork from an off-campus location.</td></tr>
  <tr><td>For detailed definitions and benefits to each class modality:
  <a href="https://www.blinn.edu/academics/course-formats.html">https://www.blinn.edu/academics/course-formats.html</a> 
  </td></tr>  
  </table> <p>Please refer to the Academic Calendar for Registration, Payment, and Class Start/End dates:  <a href="http://www.blinn.edu/calendar/index.html">
  http://www.blinn.edu/calendar/index.html</a>.
  <p>
  <a href="https://youtu.be/6V4GQdXoc4w" target="_blank">Registration Video </a>
  <p>
  <a href="https://www.youtube.com/watch?v=YRMaqrnbrdY&t=16s target="_blank">Paired Classes Registration Video (Math) 
  <p>
  <a href="https://youtu.be/HGGcuokSE-Q" target="_blank">Paired Classes Registration Video (English) </a>
  <p></SPAN></td></tr></table></DIV><p><div class="infotextdiv"><table  CLASS="infotexttable" SUMMARY="This layout table contains information that may be helpful in understanding the content and functionality of this page.  It could be a brief set of instructions, a description of error messages, or other special information."><tr><td CLASS="indefault"><img src="/wtlgifs/twgginfo.gif" alt="Information" CLASS="headerImg" TITLE="Information"  NAME="Info" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=24 WIDTH=27 /></td><td CLASS="indefault"><SPAN class="infotext"><p>
  A list of required and recommended textbooks and supplemental information for each class including the title, author, retail price, and International Standard Book Number (ISBN) can be found at the Blinn College campus bookstore website.  Select the <a href="http://blinncol.bncollege.com/webapp/wcs/stores/servlet/TBWizardView?catalogId=10001&langId=-1&storeId=19554"> Bryan campus bookstore</a> or the <a href=" http://blinn-brenham.bncollege.com/webapp/wcs/stores/servlet/TBWizardView?catalogId=10001&langId=-1&storeId=19563"> Brenham campus bookstore</a>. 
  <p>
  <b>Term Definitions</b> – Credit Courses vs. Non-Credit Courses
  <p>
  <table border=1>
  <tr><td>
  QTR 1, QTR 2, QTR 3, QTR 4   </td><td><b>Non-Credit Courses</b>
  Non-credit courses may lead to certifications and industry-recognized credentials.  Non-credit courses are taken to improve job or academic skills, for GED preparation, or for personal enrichment.
  </td>
  </tr>
  <p>
  <tr><td>
  Fall, Winter Mini, Spring, May Mini, Sum I, Sum II</td>
  <td><b>College Credit Courses</b>
  College credit courses apply toward college and university degree.  Course credits are measured in semester credit hours. 
  <ul><li>Core Curriculum
  <li>Field of Study
  <li>Degree/Certificate Track Courses & Programs</ul>
  </td>
  </tr></table></SPAN></td></tr></table><p></DIV>
  <form action="/PROD/bwckgens.p_proc_term_date" method="post" onSubmit="return checkSubmit()">
  <input type="hidden" name="p_calling_proc" value="bwckschd.p_disp_dyn_sched" />
  <table  CLASS="dataentrytable" summary="This layout table is used for term selection." width="100%"><caption class="captiontext">Search by Term: </caption>
  <tr>
  <TD CLASS="dedefault"><LABEL for=term_input_id><SPAN class="fieldlabeltextinvisible">Term</SPAN></LABEL>
  <select name="p_term" size="1"  BYPASS_ESC=>"Y" ID="term_input_id">
  <OPTION VALUE="">None</OPTION>
  <OPTION VALUE="502310">QTR 1 2022-2023-Cont Ed ONLY</OPTION>
  <OPTION VALUE="502240">QTR 4 2021-2022-Cont Ed ONLY</OPTION>
  <OPTION VALUE="502130">QTR 3 2020-2021-Cont Ed ONLY (View only)</OPTION>
  <OPTION VALUE="202310">Fall 2022</OPTION>
  <OPTION VALUE="202240">Summer II 2022 (View only)</OPTION>
  <OPTION VALUE="202230">Summer I 2022 (View only)</OPTION>
  <OPTION VALUE="202225">May Minimester 2022 (View only)</OPTION>
  <OPTION VALUE="202220">Spring 2022 (View only)</OPTION>
  <OPTION VALUE="202215">Winter Minimester 2021-2022 (View only)</OPTION>
  <OPTION VALUE="202210">Fall 2021 (View only)</OPTION>
  </select>
  </TD>
  </tr>
  </table>
  <br />
  <br />
  <input type="submit" value="Submit" />
  <input type="reset" VALUE="Reset" />
  </form>
  
  <!--  ** START OF twbkwbis.P_CloseDoc **  -->
  <table  CLASS="plaintable" SUMMARY="This is table displays line separator at end of the page."
                                               WIDTH="100%" cellSpacing=0 cellPadding=0 border=0><tr><TD class="bgtabon" width="100%" colSpan=2><img src="/wtlgifs/web_transparent.gif" alt="Transparent Image" CLASS="headerImg" TITLE="Transparent Image"  NAME="web_transparent" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=3 WIDTH=10 /></TD></tr></table>
  <a href="#top" onMouseover="window.status='Skip to top of page'; return true" onMouseout="window.status=''; return true" OnFocus="window.status='Skip to top of page'; return true" onBlur="window.status=''; return true" class="skiplinks">Skip to top of page</a>
  </DIV>
  <div class="footerbeforediv">
  
  </DIV>
  <div class="footerafterdiv">
  
  </DIV>
  <div class="globalafterdiv">
  
  </DIV>
  <div class="globalfooterdiv">
  
  </DIV>
  <div class="pagefooterdiv">
  <SPAN class="releasetext">Release: 8.7.2.6</SPAN>
  </DIV>
  <div class="poweredbydiv">
  </DIV>
  <DIV class="div1"></DIV>
  <DIV class="div2"></DIV>
  <DIV class="div3"></DIV>
  <DIV class="div4"></DIV>
  <DIV class="div5"></DIV>
  <DIV class="div6"></DIV>
  <div class="banner_copyright"> <br><h5>© 2022 Ellucian Company L.P. and its affiliates.<br></h5></div>
  </body>
  </html>`;
  const document = parse(source);
  const terms = extractTerms(document);
  const expectedTerms = [
    { name: "QTR 1 2022-2023-Cont Ed ONLY", id: "502310" },
    { name: "QTR 4 2021-2022-Cont Ed ONLY", id: "502240" },
    { name: "QTR 3 2020-2021-Cont Ed ONLY (View only)", id: "502130" },
    { name: "Fall 2022", id: "202310" },
    { name: "Summer II 2022 (View only)", id: "202240" },
    { name: "Summer I 2022 (View only)", id: "202230" },
    { name: "May Minimester 2022 (View only)", id: "202225" },
    { name: "Spring 2022 (View only)", id: "202220" },
    { name: "Winter Minimester 2021-2022 (View only)", id: "202215" },
    { name: "Fall 2021 (View only)", id: "202210" },
  ];
  assertEquals(terms, expectedTerms);
});
