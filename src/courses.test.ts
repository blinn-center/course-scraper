import { assertEquals } from "./deps.test.ts";
import { parse } from "./lib.test.ts";
import { Course, extractCourses } from "./courses.ts";
import expectedCourses from "./expectedCourses.test.json" assert {
  type: "json",
};

Deno.test("extractCourses works with source extracted from web browser", () => {
  const source = `
  <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/transitional.dtd">
  <HTML lang="en">
  <head>
  <META http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta http-equiv="Pragma" name="Cache-Control" content="no-cache">
  <meta http-equiv="Cache-Control" name="Cache-Control" content="no-cache">
  <LINK REL="stylesheet" HREF="/css/web_defaultapp.css" TYPE="text/css">
  <LINK REL="stylesheet" HREF="/css/web_defaultprint.css" TYPE="text/css" media="print">
  <title>Class Schedule Listing</title>
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
  <SPAN class="pageheaderlinks2">
  <map name="Module_Navigation_Links_H" title="Module Navigation Links">
  <p>
  <a href="#skip_Module_Navigation_Links_H" onMouseover="window.status='Skip Module Navigation Links'; return true" onMouseout="window.status=''; return true" onFocus="window.status='Skip Module Navigation Links'; return true" onBlur="window.status=''; return true"  class="skiplinks">Skip Module Navigation Links</a>
  <table  CLASS="plaintable" SUMMARY="This is main table for displaying Tab Items."
                            WIDTH="100%" cellSpacing=0 cellPadding=0 border=0>
  <tr>
  <TD CLASS="pldefault">
  <table  CLASS="plaintable" SUMMARY="This table displays Tab Items."
                   cellSpacing=0 cellPadding=0 border=0>
  <tr>
  <td class="taboff" height=22>
  <a href="/PROD/twbkwbis.P_GenMenu?name=bmenu.P_GenMnu" onMouseover="window.status='Personal Information'; return true" onMouseout="window.status=''; return true" onFocus="window.status='Personal Information'; return true" onBlur="window.status=''; return true" >Personal Information</a>
  </TD>
  <TD class="bgtaboff" height=22 vAlign="top" align="right">
  <img src="/wtlgifs/web_tab_corner_right.gif" alt="Tab Corner Right" CLASS="headerImg" TITLE="Tab Corner Right"  NAME="web_tab_corner_right" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=20 WIDTH=8 />
  </TD>
  </tr>
  </table>
  </TD>
  </tr>
  <tr>
  <TD class="bgtabon" width="100%" colSpan=2><img src="/wtlgifs/web_transparent.gif" alt="Transparent Image" CLASS="headerImg" TITLE="Transparent Image"  NAME="web_transparent" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=3 WIDTH=10 /></TD></tr></table>
  </map>
  </SPAN>
  <a name="skip_Module_Navigation_Links_H"></a>
  </DIV>
  <table  CLASS="plaintable" SUMMARY="This table displays Menu Items and Banner Search textbox."
           WIDTH="100%">
  <tr>
  <TD CLASS="pldefault">
  <div class="headerlinksdiv2">
  <form action="/PROD/twbksrch.P_ShowResults" method="post">
  Search
  <SPAN class="fieldlabeltextinvisible"><LABEL for=keyword_in_id><SPAN class="fieldlabeltext">Search</SPAN></LABEL></SPAN>
  <input type="text" name="KEYWRD_IN" size="20" maxlength="65" ID="keyword_in_id" />
  <input type="submit" value="Go" />
  </form>
  </div>
  </TD>
  <TD CLASS="pldefault"><p class="rightaligntext" /p>
  <SPAN class="pageheaderlinks">
  <a href="/PROD/twbksite.P_DispSiteMap?menu_name_in=bmenu.P_RegMnu&amp;depth_in=2&amp;columns_in=3" accesskey="2" class="submenulinktext2">SITE MAP</a>
  |
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
  <h2>Class Schedule Listing</h2>
  </TD>
  <TD CLASS="pldefault">
  &nbsp;
  </TD>
  <TD CLASS="pldefault"><p class="rightaligntext" /p>
  <div class="staticheaders">
  Fall 2022<br>
  Aug 10, 2022<br>
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
  <br />
  <div class="infotextdiv"><table  CLASS="infotexttable" SUMMARY="This layout table contains information that may be helpful in understanding the content and functionality of this page.  It could be a brief set of instructions, a description of error messages, or other special information."><tr><td CLASS="indefault"><SPAN class="infotext"> <table width="100%" border=".5">
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
  <tr><td>Due to possible closures related to the COVID-19 Pandemic, a course modality might be moved completely online during this semester.</td></tr>
  <tr><td>REMOTE - Indicates that a class has a required remote participation and students must login at the designated class time.  Students may complete that portion of the classwork from an off-campus location.</td></tr>
  <tr><td>For detailed definitions and benefits to each class modality:
  <a href="https://www.blinn.edu/academics/course-formats.html">https://www.blinn.edu/academics/course-formats.html</a> 
  </td></tr>  
  </table> <p>Please refer to the Academic Calendar for Registration, Payment, and Class Start/End dates:  <a href="http://www.blinn.edu/calendar/index.html">http://www.blinn.edu/calendar/index.html</a>.
  <p>
  <a href="https://youtu.be/6V4GQdXoc4w" target="_blank">Registration Video </a>
  <p> <p>
  A list of required and recommended textbooks and supplemental information for each class including the title, author, retail price, and International Standard Book Number (ISBN) can be found at the Blinn College campus bookstore website.  Select the <a href="http://blinncol.bncollege.com/webapp/wcs/stores/servlet/TBWizardView?catalogId=10001&langId=-1&storeId=19554"> Bryan campus bookstore</a> or the <a href=" http://blinn-brenham.bncollege.com/webapp/wcs/stores/servlet/TBWizardView?catalogId=10001&langId=-1&storeId=19563"> Brenham campus bookstore</a>. 
  <p>
  </SPAN></td></tr></table><p></DIV>
  <input type="hidden" name="sel_crn" value="dummy" />
  <input type="hidden" name="assoc_term_in" value="dummy" />
  <input type="hidden" name="ADD_BTN" value="dummy" />
  <table  CLASS="datadisplaytable" SUMMARY="This layout table is used to present the sections found" width="100%"><caption class="captiontext">Sections Found</caption>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=19352">Principles of Accounting - Financial<BR><b>Traditional - 19352 - ACCT 2301 - 101</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Aug 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  RELLIS Campus Campus
  <br />
  Lecture Schedule Type
  <br />
  Traditional Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2301&amp;sel_crse_end=2301&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault">10:35 am - 11:50 am</td>
  <td CLASS="dddefault">MW</td>
  <td CLASS="dddefault">Blinn RELLIS Admin Building 234</td>
  <td CLASS="dddefault">Aug 24, 2022 - Dec 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">Jill Alysha  Oliver (<ABBR title= "Primary">P</ABBR>)<a href="mailto:jill.oliver@blinn.edu"    target="Jill A. Oliver" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=21526">Principles of Accounting - Financial<BR><b>Traditional - 21526 - ACCT 2301 - 102</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Aug 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  RELLIS Campus Campus
  <br />
  Lecture Schedule Type
  <br />
  Traditional Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2301&amp;sel_crse_end=2301&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault">1:25 pm - 2:40 pm</td>
  <td CLASS="dddefault">TR</td>
  <td CLASS="dddefault">Blinn RELLIS Admin Building 234</td>
  <td CLASS="dddefault">Aug 24, 2022 - Dec 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">John M  Carter (<ABBR title= "Primary">P</ABBR>)<a href="mailto:Jay.Carter@blinn.edu"    target="John M. Carter" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=21624">Principles of Accounting - Financial<BR><b>Traditional - 21624 - ACCT 2301 - 301</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Aug 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  Bryan Campus Campus
  <br />
  Lecture Schedule Type
  <br />
  Traditional Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2301&amp;sel_crse_end=2301&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault">9:10 am - 10:25 am</td>
  <td CLASS="dddefault">MW</td>
  <td CLASS="dddefault">F Building 246</td>
  <td CLASS="dddefault">Aug 24, 2022 - Dec 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">Amber Lynn  Bone (<ABBR title= "Primary">P</ABBR>)<a href="mailto:Amber.Bone@blinn.edu"    target="Amber L. Bone" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=21635">Principles of Accounting - Financial<BR><b>Traditional - 21635 - ACCT 2301 - 302</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Aug 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  Bryan Campus Campus
  <br />
  Lecture Schedule Type
  <br />
  Traditional Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2301&amp;sel_crse_end=2301&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault">10:35 am - 11:50 am</td>
  <td CLASS="dddefault">TR</td>
  <td CLASS="dddefault">F Building 246</td>
  <td CLASS="dddefault">Aug 24, 2022 - Dec 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">Jill Alysha  Oliver (<ABBR title= "Primary">P</ABBR>)<a href="mailto:jill.oliver@blinn.edu"    target="Jill A. Oliver" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=16025">Principles of Accounting - Financial<BR><b>Traditional - 16025 - ACCT 2301 - 303</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Aug 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  Bryan Campus Campus
  <br />
  Lecture Schedule Type
  <br />
  Traditional Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2301&amp;sel_crse_end=2301&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault">1:25 pm - 2:40 pm</td>
  <td CLASS="dddefault">TR</td>
  <td CLASS="dddefault">F Building 246</td>
  <td CLASS="dddefault">Aug 24, 2022 - Dec 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">Jill Alysha  Oliver (<ABBR title= "Primary">P</ABBR>)<a href="mailto:jill.oliver@blinn.edu"    target="Jill A. Oliver" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=23320">Principles of Accounting - Financial<BR><b>Traditional - 23320 - ACCT 2301 - 304</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Aug 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  Bryan Campus Campus
  <br />
  Lecture Schedule Type
  <br />
  Traditional Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2301&amp;sel_crse_end=2301&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault">10:35 am - 11:50 am</td>
  <td CLASS="dddefault">MW</td>
  <td CLASS="dddefault">F Building 246</td>
  <td CLASS="dddefault">Aug 24, 2022 - Dec 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">Shane E  Stibora (<ABBR title= "Primary">P</ABBR>)<a href="mailto:shane.stibora@blinn.edu"    target="Shane E. Stibora" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=23321">Principles of Accounting - Financial<BR><b>Traditional - 23321 - ACCT 2301 - 305</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Aug 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  Bryan Campus Campus
  <br />
  Lecture Schedule Type
  <br />
  Traditional Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2301&amp;sel_crse_end=2301&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault">12:00 pm - 1:15 pm</td>
  <td CLASS="dddefault">TR</td>
  <td CLASS="dddefault">F Building 246</td>
  <td CLASS="dddefault">Aug 24, 2022 - Dec 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">Amber Lynn  Bone (<ABBR title= "Primary">P</ABBR>)<a href="mailto:Amber.Bone@blinn.edu"    target="Amber L. Bone" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=23448">Principles of Accounting-Financial<BR><b>Traditional - 23448 - ACCT 2301 - 306</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Aug 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  Bryan Campus Campus
  <br />
  Lecture Schedule Type
  <br />
  Traditional Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2301&amp;sel_crse_end=2301&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault">2:50 pm - 4:05 pm</td>
  <td CLASS="dddefault">MW</td>
  <td CLASS="dddefault">F Building 216</td>
  <td CLASS="dddefault">Aug 24, 2022 - Dec 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">John M  Carter (<ABBR title= "Primary">P</ABBR>)<a href="mailto:Jay.Carter@blinn.edu"    target="John M. Carter" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=21549">Principles of Accounting - Financial<BR><b>Blended - 21549 - ACCT 2301 - B0A</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <B>Delivery: </B><A HREF="http://www.blinn.edu/online/types-of-dl-courses.html" target="_blank"><U>Blended (Hybrid) Course</U></a> <- Click for more information.<BR> 
  <B>Term</B>: This is a <B>first 8-week session</B> blended course.<BR> 
  
  <br />
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Aug 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  Brenham Campus Campus
  <br />
  Lecture Schedule Type
  <br />
  Blended Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2301&amp;sel_crse_end=2301&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault">9:10 am - 10:25 am</td>
  <td CLASS="dddefault">MW</td>
  <td CLASS="dddefault">Bullock Building               151</td>
  <td CLASS="dddefault">Aug 24, 2022 - Oct 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">Kwohn Rashaad  Whitaker (<ABBR title= "Primary">P</ABBR>)<a href="mailto:Kwohn.Whitaker@blinn.edu"    target="Kwohn R. Whitaker" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=19355">Principles of Accounting - Financial<BR><b>Blended - 19355 - ACCT 2301 - B0N</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <B>Delivery: </B><A HREF="http://www.blinn.edu/online/types-of-dl-courses.html" target="_blank"><U>Blended (Hybrid) Course</U></a> <- Click for more information.<BR> 
  <B>Term</B>: This is a <B>second 8-week session</B> blended course.<BR> 
  
  <br />
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Oct 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  Brenham Campus Campus
  <br />
  Lecture Schedule Type
  <br />
  Blended Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2301&amp;sel_crse_end=2301&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault">10:35 am - 11:50 am</td>
  <td CLASS="dddefault">TR</td>
  <td CLASS="dddefault">Bullock Building               151</td>
  <td CLASS="dddefault">Oct 24, 2022 - Dec 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">Kwohn Rashaad  Whitaker (<ABBR title= "Primary">P</ABBR>)<a href="mailto:Kwohn.Whitaker@blinn.edu"    target="Kwohn R. Whitaker" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=19338">Principles of Accounting - Financial<BR><b>Blended - 19338 - ACCT 2301 - B1A</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <B>Delivery: </B><A HREF="http://www.blinn.edu/online/types-of-dl-courses.html" target="_blank"><U>Blended (Hybrid) Course</U></a> <- Click for more information.<BR> 
  <B>Term</B>: This is a <B>first 8-week session</B> blended course.<BR> 
  
  <br />
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Aug 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  RELLIS Campus Campus
  <br />
  Lecture Schedule Type
  <br />
  Blended Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2301&amp;sel_crse_end=2301&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault">12:00 pm - 1:15 pm</td>
  <td CLASS="dddefault">MW</td>
  <td CLASS="dddefault">Blinn RELLIS Admin Building 234</td>
  <td CLASS="dddefault">Aug 24, 2022 - Oct 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">Leslie Forester  Barnard (<ABBR title= "Primary">P</ABBR>)<a href="mailto:Leslie.Barnard@blinn.edu"    target="Leslie F. Barnard" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=19346">Principles of Accounting - Financial<BR><b>Blended - 19346 - ACCT 2301 - B1B</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <B>Delivery: </B><A HREF="http://www.blinn.edu/online/types-of-dl-courses.html" target="_blank"><U>Blended (Hybrid) Course</U></a> <- Click for more information.<BR> 
  <B>Term</B>: This is a <B>first 8-week session</B> blended course.<BR> 
  
  <br />
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Aug 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  RELLIS Campus Campus
  <br />
  Lecture Schedule Type
  <br />
  Blended Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2301&amp;sel_crse_end=2301&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault">9:10 am - 10:25 am</td>
  <td CLASS="dddefault">TR</td>
  <td CLASS="dddefault">Blinn RELLIS Admin Building 234</td>
  <td CLASS="dddefault">Aug 24, 2022 - Oct 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">Muriel Bonneau  Brannon (<ABBR title= "Primary">P</ABBR>)<a href="mailto:muriel.brannon@blinn.edu"    target="Muriel B. Brannon" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=23306">Principles of Accounting- Financial<BR><b>Blended - 23306 - ACCT 2301 - B1C</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <B>Delivery: </B><A HREF="http://www.blinn.edu/online/types-of-dl-courses.html" target="_blank"><U>Blended (Hybrid) Course</U></a> <- Click for more information.<BR> 
  <B>Term</B>: This is a <B>first 8-week session</B> blended course.<BR> 
  
  <br />
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Aug 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  RELLIS Campus Campus
  <br />
  Lecture Schedule Type
  <br />
  Blended Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2301&amp;sel_crse_end=2301&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault">9:10 am - 10:25 am</td>
  <td CLASS="dddefault">MW</td>
  <td CLASS="dddefault">Blinn RELLIS Admin Building 234</td>
  <td CLASS="dddefault">Aug 24, 2022 - Oct 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">Jill Alysha  Oliver (<ABBR title= "Primary">P</ABBR>)<a href="mailto:jill.oliver@blinn.edu"    target="Jill A. Oliver" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=19334">Principles of Accounting - Financial<BR><b>Blended - 19334 - ACCT 2301 - B1N</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <B>Delivery: </B><A HREF="http://www.blinn.edu/online/types-of-dl-courses.html" target="_blank"><U>Blended (Hybrid) Course</U></a> <- Click for more information.<BR> 
  <B>Term</B>: This is a <B>second 8-week session</B> blended course.<BR> 
  
  <br />
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Oct 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  RELLIS Campus Campus
  <br />
  Lecture Schedule Type
  <br />
  Blended Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2301&amp;sel_crse_end=2301&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault">1:25 pm - 2:40 pm</td>
  <td CLASS="dddefault">MW</td>
  <td CLASS="dddefault">Blinn RELLIS Admin Building 234</td>
  <td CLASS="dddefault">Oct 24, 2022 - Dec 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">Leslie Forester  Barnard (<ABBR title= "Primary">P</ABBR>)<a href="mailto:Leslie.Barnard@blinn.edu"    target="Leslie F. Barnard" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=19349">Principles of Accounting - Financial<BR><b>Blended - 19349 - ACCT 2301 - B1O</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <B>Delivery: </B><A HREF="http://www.blinn.edu/online/types-of-dl-courses.html" target="_blank"><U>Blended (Hybrid) Course</U></a> <- Click for more information.<BR> 
  <B>Term</B>: This is a <B>second 8-week session</B> blended course.<BR> 
  
  <br />
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Oct 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  RELLIS Campus Campus
  <br />
  Lecture Schedule Type
  <br />
  Blended Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2301&amp;sel_crse_end=2301&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault">2:50 pm - 4:05 pm</td>
  <td CLASS="dddefault">TR</td>
  <td CLASS="dddefault">Blinn RELLIS Admin Building 234</td>
  <td CLASS="dddefault">Oct 24, 2022 - Dec 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">John M  Carter (<ABBR title= "Primary">P</ABBR>)<a href="mailto:Jay.Carter@blinn.edu"    target="John M. Carter" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=19368">Principles of Accounting - Financial<BR><b>Blended - 19368 - ACCT 2301 - B3A</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <B>Delivery: </B><A HREF="http://www.blinn.edu/online/types-of-dl-courses.html" target="_blank"><U>Blended (Hybrid) Course</U></a> <- Click for more information.<BR> 
  <B>Term</B>: This is a <B>first 8-week session</B> blended course.<BR> 
  
  <br />
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Aug 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  Bryan Campus Campus
  <br />
  Lecture Schedule Type
  <br />
  Blended Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2301&amp;sel_crse_end=2301&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault">10:35 am - 11:50 am</td>
  <td CLASS="dddefault">MW</td>
  <td CLASS="dddefault">F Building 216</td>
  <td CLASS="dddefault">Aug 24, 2022 - Oct 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">Muriel Bonneau  Brannon (<ABBR title= "Primary">P</ABBR>)<a href="mailto:muriel.brannon@blinn.edu"    target="Muriel B. Brannon" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=19371">Principles of Accounting - Financial<BR><b>Blended - 19371 - ACCT 2301 - B3B</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <B>Delivery: </B><A HREF="http://www.blinn.edu/online/types-of-dl-courses.html" target="_blank"><U>Blended (Hybrid) Course</U></a> <- Click for more information.<BR> 
  <B>Term</B>: This is a <B>first 8-week session</B> blended course.<BR> 
  
  <br />
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Aug 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  Bryan Campus Campus
  <br />
  Lecture Schedule Type
  <br />
  Blended Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2301&amp;sel_crse_end=2301&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault">1:25 pm - 2:40 pm</td>
  <td CLASS="dddefault">MW</td>
  <td CLASS="dddefault">F Building 246</td>
  <td CLASS="dddefault">Aug 24, 2022 - Oct 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">Shane E  Stibora (<ABBR title= "Primary">P</ABBR>)<a href="mailto:shane.stibora@blinn.edu"    target="Shane E. Stibora" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=19388">Principles of Accounting - Financial<BR><b>Blended - 19388 - ACCT 2301 - B3C</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <B>Delivery: </B><A HREF="http://www.blinn.edu/online/types-of-dl-courses.html" target="_blank"><U>Blended (Hybrid) Course</U></a> <- Click for more information.<BR> 
  <B>Term</B>: This is a <B>first 8-week session</B> blended course.<BR> 
  
  <br />
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Aug 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  Bryan Campus Campus
  <br />
  Lecture Schedule Type
  <br />
  Blended Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2301&amp;sel_crse_end=2301&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault">9:10 am - 10:25 am</td>
  <td CLASS="dddefault">TR</td>
  <td CLASS="dddefault">F Building 246</td>
  <td CLASS="dddefault">Aug 24, 2022 - Oct 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">Amber Lynn  Bone (<ABBR title= "Primary">P</ABBR>)<a href="mailto:Amber.Bone@blinn.edu"    target="Amber L. Bone" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=19397">Principles of Accounting - Financial<BR><b>Blended - 19397 - ACCT 2301 - B3D</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <B>Delivery: </B><A HREF="http://www.blinn.edu/online/types-of-dl-courses.html" target="_blank"><U>Blended (Hybrid) Course</U></a> <- Click for more information.<BR> 
  <B>Term</B>: This is a <B>first 8-week session</B> blended course.<BR> 
  
  <br />
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Aug 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  Bryan Campus Campus
  <br />
  Lecture Schedule Type
  <br />
  Blended Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2301&amp;sel_crse_end=2301&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault">12:00 pm - 1:15 pm</td>
  <td CLASS="dddefault">TR</td>
  <td CLASS="dddefault">H Building 226</td>
  <td CLASS="dddefault">Aug 24, 2022 - Oct 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">Maria   Bulgarelli (<ABBR title= "Primary">P</ABBR>)<a href="mailto:Maria.Bulgarelli@blinn.edu"    target="Maria Bulgarelli" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=19379">Principles of Accounting - Financial<BR><b>Blended - 19379 - ACCT 2301 - B3E</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <B>Delivery: </B><A HREF="http://www.blinn.edu/online/types-of-dl-courses.html" target="_blank"><U>Blended (Hybrid) Course</U></a> <- Click for more information.<BR> 
  <B>Term</B>: This is a <B>first 8-week session</B> blended course.<BR> 
  
  <br />
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Aug 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  Bryan Campus Campus
  <br />
  Lecture Schedule Type
  <br />
  Blended Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2301&amp;sel_crse_end=2301&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault">2:50 pm - 4:05 pm</td>
  <td CLASS="dddefault">TR</td>
  <td CLASS="dddefault">F Building 246</td>
  <td CLASS="dddefault">Aug 24, 2022 - Oct 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">Jill Alysha  Oliver (<ABBR title= "Primary">P</ABBR>)<a href="mailto:jill.oliver@blinn.edu"    target="Jill A. Oliver" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=19375">Principles of Accounting - Financial<BR><b>Blended - 19375 - ACCT 2301 - B3N</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <B>Delivery: </B><A HREF="http://www.blinn.edu/online/types-of-dl-courses.html" target="_blank"><U>Blended (Hybrid) Course</U></a> <- Click for more information.<BR> 
  <B>Term</B>: This is a <B>second 8-week session</B> blended course.<BR> 
  
  <br />
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Oct 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  Bryan Campus Campus
  <br />
  Lecture Schedule Type
  <br />
  Blended Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2301&amp;sel_crse_end=2301&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault">12:00 pm - 1:15 pm</td>
  <td CLASS="dddefault">MW</td>
  <td CLASS="dddefault">F Building 216</td>
  <td CLASS="dddefault">Oct 24, 2022 - Dec 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">Muriel Bonneau  Brannon (<ABBR title= "Primary">P</ABBR>)<a href="mailto:muriel.brannon@blinn.edu"    target="Muriel B. Brannon" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=19382">Principles of Accounting - Financial<BR><b>Blended - 19382 - ACCT 2301 - B3O</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <B>Delivery: </B><A HREF="http://www.blinn.edu/online/types-of-dl-courses.html" target="_blank"><U>Blended (Hybrid) Course</U></a> <- Click for more information.<BR> 
  <B>Term</B>: This is a <B>second 8-week session</B> blended course.<BR> 
  
  <br />
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Oct 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  Bryan Campus Campus
  <br />
  Lecture Schedule Type
  <br />
  Blended Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2301&amp;sel_crse_end=2301&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault">9:10 am - 10:25 am</td>
  <td CLASS="dddefault">MW</td>
  <td CLASS="dddefault">F Building 216</td>
  <td CLASS="dddefault">Oct 24, 2022 - Dec 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">Muriel Bonneau  Brannon (<ABBR title= "Primary">P</ABBR>)<a href="mailto:muriel.brannon@blinn.edu"    target="Muriel B. Brannon" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=19400">Principles of Accounting - Financial<BR><b>Blended - 19400 - ACCT 2301 - B3P</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <B>Delivery: </B><A HREF="http://www.blinn.edu/online/types-of-dl-courses.html" target="_blank"><U>Blended (Hybrid) Course</U></a> <- Click for more information.<BR> 
  <B>Term</B>: This is a <B>second 8-week session</B> blended course.<BR> 
  
  <br />
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Oct 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  Bryan Campus Campus
  <br />
  Lecture Schedule Type
  <br />
  Blended Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2301&amp;sel_crse_end=2301&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault">2:50 pm - 4:05 pm</td>
  <td CLASS="dddefault">MW</td>
  <td CLASS="dddefault">F Building 246</td>
  <td CLASS="dddefault">Oct 24, 2022 - Dec 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">Shane E  Stibora (<ABBR title= "Primary">P</ABBR>)<a href="mailto:shane.stibora@blinn.edu"    target="Shane E. Stibora" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=19394">Principles of Accounting - Financial<BR><b>Blended - 19394 - ACCT 2301 - B3Q</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <B>Delivery: </B><A HREF="http://www.blinn.edu/online/types-of-dl-courses.html" target="_blank"><U>Blended (Hybrid) Course</U></a> <- Click for more information.<BR> 
  <B>Term</B>: This is a <B>second 8-week session</B> blended course.<BR> 
  
  <br />
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Oct 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  Bryan Campus Campus
  <br />
  Lecture Schedule Type
  <br />
  Blended Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckschd.p_disp_syllabus?term_in=202310&amp;crn_in=19394">Syllabus Available</a>
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2301&amp;sel_crse_end=2301&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault">10:35 am - 11:50 am</td>
  <td CLASS="dddefault">TR</td>
  <td CLASS="dddefault">H Building 226</td>
  <td CLASS="dddefault">Oct 24, 2022 - Dec 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">Maria   Bulgarelli (<ABBR title= "Primary">P</ABBR>)<a href="mailto:Maria.Bulgarelli@blinn.edu"    target="Maria Bulgarelli" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=19405">Principles of Accounting - Financial<BR><b>Blended - 19405 - ACCT 2301 - B3R</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <B>Delivery: </B><A HREF="http://www.blinn.edu/online/types-of-dl-courses.html" target="_blank"><U>Blended (Hybrid) Course</U></a> <- Click for more information.<BR> 
  <B>Term</B>: This is a <B>second 8-week session</B> blended course.<BR> 
  
  <br />
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Oct 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  Bryan Campus Campus
  <br />
  Lecture Schedule Type
  <br />
  Blended Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2301&amp;sel_crse_end=2301&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault">1:25 pm - 2:40 pm</td>
  <td CLASS="dddefault">TR</td>
  <td CLASS="dddefault">H Building 226</td>
  <td CLASS="dddefault">Oct 24, 2022 - Dec 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">Maria   Bulgarelli (<ABBR title= "Primary">P</ABBR>)<a href="mailto:Maria.Bulgarelli@blinn.edu"    target="Maria Bulgarelli" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=22594">Principles of Accounting - Financial<BR><b>Flex Online - 22594 - ACCT 2301 - N01</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <B>Delivery: </B><A HREF=" http://www.blinn.edu/online/types-of-dl-courses.html" target="_blank"><U>Online (Internet) Course</U></a> <- Click for more information.<BR>
  <br />
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Aug 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  Distance Education Campus
  <br />
  Lecture Schedule Type
  <br />
  Flex Online Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2301&amp;sel_crse_end=2301&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault"><ABBR title = "To Be Announced">TBA</ABBR></td>
  <td CLASS="dddefault">&nbsp;</td>
  <td CLASS="dddefault">Online Class-Requires Computer </td>
  <td CLASS="dddefault">Aug 24, 2022 - Dec 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">Stacy Lynne  Conrad (<ABBR title= "Primary">P</ABBR>)<a href="mailto:Stacy.Conrad@blinn.edu"    target="Stacy L. Conrad" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=22595">Principles of Accounting - Financial<BR><b>Flex Online - 22595 - ACCT 2301 - N02</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <B>Delivery: </B><A HREF=" http://www.blinn.edu/online/types-of-dl-courses.html" target="_blank"><U>Online (Internet) Course</U></a> <- Click for more information.<BR>
  <br />
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Aug 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  Distance Education Campus
  <br />
  Lecture Schedule Type
  <br />
  Flex Online Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2301&amp;sel_crse_end=2301&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault"><ABBR title = "To Be Announced">TBA</ABBR></td>
  <td CLASS="dddefault">&nbsp;</td>
  <td CLASS="dddefault">Online Class-Requires Computer </td>
  <td CLASS="dddefault">Aug 24, 2022 - Dec 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">Stacy Lynne  Conrad (<ABBR title= "Primary">P</ABBR>)<a href="mailto:Stacy.Conrad@blinn.edu"    target="Stacy L. Conrad" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=19414">Principles of Accounting - Financial<BR><b>Flex Online - 19414 - ACCT 2301 - N11</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <B>Delivery: </B><A HREF="http://www.blinn.edu/online/types-of-dl-courses.html" target="_blank"><U>Online (Internet) Course</U></a> <- Click for more information.<BR>
  <B>Term</B>: This is a <B>first 8-week session</B> online course.<BR>
  <B>Some assessments may require proctoring.</B><BR>
  <br />
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Aug 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  Distance Education Campus
  <br />
  Lecture Schedule Type
  <br />
  Flex Online Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2301&amp;sel_crse_end=2301&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault"><ABBR title = "To Be Announced">TBA</ABBR></td>
  <td CLASS="dddefault">&nbsp;</td>
  <td CLASS="dddefault">Online Class - First 8 week </td>
  <td CLASS="dddefault">Aug 24, 2022 - Oct 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">Rebecca R  Barta (<ABBR title= "Primary">P</ABBR>)<a href="mailto:rebecca.barta@blinn.edu"    target="Rebecca R. Barta" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=11569">Principles of Accounting - Financial<BR><b>Flex Online - 11569 - ACCT 2301 - N13</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <B>Delivery: </B><A HREF="http://www.blinn.edu/online/types-of-dl-courses.html" target="_blank"><U>Online (Internet) Course</U></a> <- Click for more information.<BR> 
  <B>Term</B>: This is a <B>first 8-week session</B> online course.<BR> 
  
  <br />
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Aug 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  Distance Education Campus
  <br />
  Lecture Schedule Type
  <br />
  Flex Online Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2301&amp;sel_crse_end=2301&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault"><ABBR title = "To Be Announced">TBA</ABBR></td>
  <td CLASS="dddefault">&nbsp;</td>
  <td CLASS="dddefault">Online Class - First 8 week </td>
  <td CLASS="dddefault">Aug 24, 2022 - Oct 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">Timothy   Kenny (<ABBR title= "Primary">P</ABBR>)<a href="mailto:Tim.Kenny@blinn.edu"    target="Timothy Kenny" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=19416">Principles of Accounting - Financial<BR><b>Flex Online - 19416 - ACCT 2301 - N21</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <B>Delivery: </B><A HREF="http://www.blinn.edu/online/types-of-dl-courses.html" target="_blank"><U>Online (Internet) Course</U></a> <- Click for more information.<BR> 
  <B>Term</B>: This is a <B>second 8-week session</B> online course.<BR> 
  
  <br />
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Oct 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  Distance Education Campus
  <br />
  Lecture Schedule Type
  <br />
  Flex Online Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2301&amp;sel_crse_end=2301&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault"><ABBR title = "To Be Announced">TBA</ABBR></td>
  <td CLASS="dddefault">&nbsp;</td>
  <td CLASS="dddefault">Online Class - Second 8 week </td>
  <td CLASS="dddefault">Oct 24, 2022 - Dec 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">Timothy   Kenny (<ABBR title= "Primary">P</ABBR>)<a href="mailto:Tim.Kenny@blinn.edu"    target="Timothy Kenny" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=22597">Principles of Accounting - Financial<BR><b>Flex Online - 22597 - ACCT 2301 - N23</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <B>Delivery: </B><A HREF="http://www.blinn.edu/online/types-of-dl-courses.html" target="_blank"><U>Online (Internet) Course</U></a> <- Click for more information.<BR> 
  <B>Term</B>: This is a <B>second 8-week session</B> online course.<BR> 
  
  <br />
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Oct 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  Distance Education Campus
  <br />
  Lecture Schedule Type
  <br />
  Flex Online Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2301&amp;sel_crse_end=2301&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault"><ABBR title = "To Be Announced">TBA</ABBR></td>
  <td CLASS="dddefault">&nbsp;</td>
  <td CLASS="dddefault">Online Class - Second 8 week </td>
  <td CLASS="dddefault">Oct 24, 2022 - Dec 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">Rebecca R  Barta (<ABBR title= "Primary">P</ABBR>)<a href="mailto:rebecca.barta@blinn.edu"    target="Rebecca R. Barta" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=19359">Principles of Accounting - Financial<BR><b>Interactive Video - 19359 - ACCT 2301 - V01</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Aug 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  Brenham Campus Campus
  <br />
  Lecture Schedule Type
  <br />
  Live Online W/Onsite Instr Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2301&amp;sel_crse_end=2301&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault">1:25 pm - 2:40 pm</td>
  <td CLASS="dddefault">MW</td>
  <td CLASS="dddefault">Bullock Building               120</td>
  <td CLASS="dddefault">Aug 24, 2022 - Dec 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">Kwohn Rashaad  Whitaker (<ABBR title= "Primary">P</ABBR>)<a href="mailto:Kwohn.Whitaker@blinn.edu"    target="Kwohn R. Whitaker" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=19364">Principles of Accounting - Financial<BR><b>Interactive Video - 19364 - ACCT 2301 - V06</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Aug 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  Schulenburg Campus Campus
  <br />
  Lecture Schedule Type
  <br />
  Live Online W/O Onsite Instr Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2301&amp;sel_crse_end=2301&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault">1:25 pm - 2:40 pm</td>
  <td CLASS="dddefault">MW</td>
  <td CLASS="dddefault">Schulenburg Main Building      102</td>
  <td CLASS="dddefault">Aug 24, 2022 - Dec 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">Kwohn Rashaad  Whitaker (<ABBR title= "Primary">P</ABBR>)<a href="mailto:Kwohn.Whitaker@blinn.edu"    target="Kwohn R. Whitaker" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=19365">Principles of Accounting - Financial<BR><b>Interactive Video - 19365 - ACCT 2301 - V07</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Aug 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  Sealy Campus Campus
  <br />
  Lecture Schedule Type
  <br />
  Live Online W/O Onsite Instr Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2301&amp;sel_crse_end=2301&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault">1:25 pm - 2:40 pm</td>
  <td CLASS="dddefault">MW</td>
  <td CLASS="dddefault">Sealy Campus Main Building     109</td>
  <td CLASS="dddefault">Aug 24, 2022 - Dec 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">Kwohn Rashaad  Whitaker (<ABBR title= "Primary">P</ABBR>)<a href="mailto:Kwohn.Whitaker@blinn.edu"    target="Kwohn R. Whitaker" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=22600">Principles of Accounting - Managerial<BR><b>Blended - 22600 - ACCT 2302 - B1A</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <B>Delivery: </B><A HREF="http://www.blinn.edu/online/types-of-dl-courses.html" target="_blank"><U>Blended (Hybrid) Course</U></a> <- Click for more information.<BR> 
  <B>Term</B>: This is a <B>first 8-week session</B> blended course.<BR> 
  
  <br />
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Aug 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  RELLIS Campus Campus
  <br />
  Lecture Schedule Type
  <br />
  Blended Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2302&amp;sel_crse_end=2302&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault">12:00 pm - 1:15 pm</td>
  <td CLASS="dddefault">TR</td>
  <td CLASS="dddefault">Blinn RELLIS Admin Building 234</td>
  <td CLASS="dddefault">Aug 24, 2022 - Oct 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">John M  Carter (<ABBR title= "Primary">P</ABBR>)<a href="mailto:Jay.Carter@blinn.edu"    target="John M. Carter" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=19430">Principles of Accounting - Managerial<BR><b>Blended - 19430 - ACCT 2302 - B1B</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <B>Delivery: </B><A HREF="http://www.blinn.edu/online/types-of-dl-courses.html" target="_blank"><U>Blended (Hybrid) Course</U></a> <- Click for more information.<BR> 
  <B>Term</B>: This is a <B>first 8-week session</B> blended course.<BR> 
  
  <br />
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Aug 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  RELLIS Campus Campus
  <br />
  Lecture Schedule Type
  <br />
  Blended Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2302&amp;sel_crse_end=2302&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault">1:25 pm - 2:40 pm</td>
  <td CLASS="dddefault">MW</td>
  <td CLASS="dddefault">Blinn RELLIS Admin Building 234</td>
  <td CLASS="dddefault">Aug 24, 2022 - Oct 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">Leslie Forester  Barnard (<ABBR title= "Primary">P</ABBR>)<a href="mailto:Leslie.Barnard@blinn.edu"    target="Leslie F. Barnard" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=21529">Principles of Accounting - Managerial<BR><b>Blended - 21529 - ACCT 2302 - B1N</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <B>Delivery: </B><A HREF="http://www.blinn.edu/online/types-of-dl-courses.html" target="_blank"><U>Blended (Hybrid) Course</U></a> <- Click for more information.<BR> 
  <B>Term</B>: This is a <B>second 8-week session</B> blended course.<BR> 
  
  <br />
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Oct 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  RELLIS Campus Campus
  <br />
  Lecture Schedule Type
  <br />
  Blended Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2302&amp;sel_crse_end=2302&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault">12:00 pm - 1:15 pm</td>
  <td CLASS="dddefault">MW</td>
  <td CLASS="dddefault">Blinn RELLIS Admin Building 234</td>
  <td CLASS="dddefault">Oct 24, 2022 - Dec 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">Leslie Forester  Barnard (<ABBR title= "Primary">P</ABBR>)<a href="mailto:Leslie.Barnard@blinn.edu"    target="Leslie F. Barnard" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=19427">Principles of Accounting - Managerial<BR><b>Blended - 19427 - ACCT 2302 - B1O</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <B>Delivery: </B><A HREF="http://www.blinn.edu/online/types-of-dl-courses.html" target="_blank"><U>Blended (Hybrid) Course</U></a> <- Click for more information.<BR> 
  <B>Term</B>: This is a <B>second 8-week session</B> blended course.<BR> 
  
  <br />
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Oct 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  RELLIS Campus Campus
  <br />
  Lecture Schedule Type
  <br />
  Blended Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2302&amp;sel_crse_end=2302&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault">10:35 am - 11:50 am</td>
  <td CLASS="dddefault">TR</td>
  <td CLASS="dddefault">Blinn RELLIS Admin Building 234</td>
  <td CLASS="dddefault">Oct 24, 2022 - Dec 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">John M  Carter (<ABBR title= "Primary">P</ABBR>)<a href="mailto:Jay.Carter@blinn.edu"    target="John M. Carter" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=19433">Principles of Accounting - Managerial<BR><b>Blended - 19433 - ACCT 2302 - B3A</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <B>Delivery: </B><A HREF="http://www.blinn.edu/online/types-of-dl-courses.html" target="_blank"><U>Blended (Hybrid) Course</U></a> <- Click for more information.<BR> 
  <B>Term</B>: This is a <B>first 8-week session</B> blended course.<BR> 
  
  <br />
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Aug 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  Bryan Campus Campus
  <br />
  Lecture Schedule Type
  <br />
  Blended Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2302&amp;sel_crse_end=2302&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault">12:00 pm - 1:15 pm</td>
  <td CLASS="dddefault">MW</td>
  <td CLASS="dddefault">F Building 216</td>
  <td CLASS="dddefault">Aug 24, 2022 - Oct 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">John M  Carter (<ABBR title= "Primary">P</ABBR>)<a href="mailto:Jay.Carter@blinn.edu"    target="John M. Carter" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=19437">Principles of Accounting - Managerial<BR><b>Blended - 19437 - ACCT 2302 - B3B</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <B>Delivery: </B><A HREF="http://www.blinn.edu/online/types-of-dl-courses.html" target="_blank"><U>Blended (Hybrid) Course</U></a> <- Click for more information.<BR> 
  <B>Term</B>: This is a <B>first 8-week session</B> blended course.<BR> 
  
  <br />
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Aug 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  Bryan Campus Campus
  <br />
  Lecture Schedule Type
  <br />
  Blended Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2302&amp;sel_crse_end=2302&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault">10:35 am - 11:50 am</td>
  <td CLASS="dddefault">TR</td>
  <td CLASS="dddefault">H Building 226</td>
  <td CLASS="dddefault">Aug 24, 2022 - Oct 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">Maria   Bulgarelli (<ABBR title= "Primary">P</ABBR>)<a href="mailto:Maria.Bulgarelli@blinn.edu"    target="Maria Bulgarelli" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=23310">Principles of Managerial Accounting<BR><b>Blended - 23310 - ACCT 2302 - B3C</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <B>Delivery: </B><A HREF="http://www.blinn.edu/online/types-of-dl-courses.html" target="_blank"><U>Blended (Hybrid) Course</U></a> <- Click for more information.<BR> 
  <B>Term</B>: This is a <B>first 8-week session</B> blended course.<BR> 
  
  <br />
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Aug 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  Bryan Campus Campus
  <br />
  Lecture Schedule Type
  <br />
  Blended Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2302&amp;sel_crse_end=2302&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault">1:25 pm - 2:40 pm</td>
  <td CLASS="dddefault">MW</td>
  <td CLASS="dddefault">F Building 216</td>
  <td CLASS="dddefault">Aug 24, 2022 - Oct 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">John M  Carter (<ABBR title= "Primary">P</ABBR>)<a href="mailto:Jay.Carter@blinn.edu"    target="John M. Carter" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=19443">Principles of Accounting - Managerial<BR><b>Blended - 19443 - ACCT 2302 - B3N</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <B>Delivery: </B><A HREF="http://www.blinn.edu/online/types-of-dl-courses.html" target="_blank"><U>Blended (Hybrid) Course</U></a> <- Click for more information.<BR> 
  <B>Term</B>: This is a <B>second 8-week session</B> blended course.<BR> 
  
  <br />
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Oct 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  Bryan Campus Campus
  <br />
  Lecture Schedule Type
  <br />
  Blended Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2302&amp;sel_crse_end=2302&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault">1:25 pm - 2:40 pm</td>
  <td CLASS="dddefault">MW</td>
  <td CLASS="dddefault">F Building 216</td>
  <td CLASS="dddefault">Oct 24, 2022 - Dec 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">Muriel Bonneau  Brannon (<ABBR title= "Primary">P</ABBR>)<a href="mailto:muriel.brannon@blinn.edu"    target="Muriel B. Brannon" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=19446">Principles of Accounting - Managerial<BR><b>Blended - 19446 - ACCT 2302 - B3O</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <B>Delivery: </B><A HREF="http://www.blinn.edu/online/types-of-dl-courses.html" target="_blank"><U>Blended (Hybrid) Course</U></a> <- Click for more information.<BR> 
  <B>Term</B>: This is a <B>second 8-week session</B> blended course.<BR> 
  
  <br />
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Oct 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  Bryan Campus Campus
  <br />
  Lecture Schedule Type
  <br />
  Blended Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2302&amp;sel_crse_end=2302&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault">2:50 pm - 4:05 pm</td>
  <td CLASS="dddefault">TR</td>
  <td CLASS="dddefault">F Building 246</td>
  <td CLASS="dddefault">Oct 24, 2022 - Dec 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">Jill Alysha  Oliver (<ABBR title= "Primary">P</ABBR>)<a href="mailto:jill.oliver@blinn.edu"    target="Jill A. Oliver" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=22598">Principles of Accounting - Managerial<BR><b>Flex Online - 22598 - ACCT 2302 - N01</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <B>Delivery: </B><A HREF=" http://www.blinn.edu/online/types-of-dl-courses.html" target="_blank"><U>Online (Internet) Course</U></a> <- Click for more information.<BR>
  <br />
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Aug 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  Distance Education Campus
  <br />
  Lecture Schedule Type
  <br />
  Flex Online Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2302&amp;sel_crse_end=2302&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault"><ABBR title = "To Be Announced">TBA</ABBR></td>
  <td CLASS="dddefault">&nbsp;</td>
  <td CLASS="dddefault">Online Class-Requires Computer </td>
  <td CLASS="dddefault">Aug 24, 2022 - Dec 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault"><ABBR title = "To Be Announced">TBA</ABBR></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=23322">Principles of Managerial Accounting<BR><b>Flex Online - 23322 - ACCT 2302 - N02</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <B>Delivery: </B><A HREF=" http://www.blinn.edu/online/types-of-dl-courses.html" target="_blank"><U>Online (Internet) Course</U></a> <- Click for more information.<BR>
  <br />
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Aug 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  Distance Education Campus
  <br />
  Lecture Schedule Type
  <br />
  Flex Online Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2302&amp;sel_crse_end=2302&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault"><ABBR title = "To Be Announced">TBA</ABBR></td>
  <td CLASS="dddefault">&nbsp;</td>
  <td CLASS="dddefault">Online Class-Requires Computer </td>
  <td CLASS="dddefault">Aug 24, 2022 - Dec 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault"><ABBR title = "To Be Announced">TBA</ABBR></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=19449">Principles of Accounting - Managerial<BR><b>Flex Online - 19449 - ACCT 2302 - N11</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <B>Delivery: </B><A HREF="http://www.blinn.edu/online/types-of-dl-courses.html" target="_blank"><U>Online (Internet) Course</U></a> <- Click for more information.<BR>
  <B>Term</B>: This is a <B>first 8-week session</B> online course.<BR>
  <B>Some assessments may require proctoring.</B><BR>
  <br />
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Aug 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  Distance Education Campus
  <br />
  Lecture Schedule Type
  <br />
  Flex Online Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2302&amp;sel_crse_end=2302&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault"><ABBR title = "To Be Announced">TBA</ABBR></td>
  <td CLASS="dddefault">&nbsp;</td>
  <td CLASS="dddefault">Online Class - First 8 week </td>
  <td CLASS="dddefault">Aug 24, 2022 - Oct 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">Timothy   Kenny (<ABBR title= "Primary">P</ABBR>)<a href="mailto:Tim.Kenny@blinn.edu"    target="Timothy Kenny" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=22599">Principles of Accounting - Managerial<BR><b>Flex Online - 22599 - ACCT 2302 - N12</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <B>Delivery: </B><A HREF="http://www.blinn.edu/online/types-of-dl-courses.html" target="_blank"><U>Online (Internet) Course</U></a> <- Click for more information.<BR> 
  <B>Term</B>: This is a <B>first 8-week session</B> online course.<BR> 
  
  <br />
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Aug 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  Distance Education Campus
  <br />
  Lecture Schedule Type
  <br />
  Flex Online Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2302&amp;sel_crse_end=2302&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault"><ABBR title = "To Be Announced">TBA</ABBR></td>
  <td CLASS="dddefault">&nbsp;</td>
  <td CLASS="dddefault">Online Class - First 8 week </td>
  <td CLASS="dddefault">Aug 24, 2022 - Oct 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">Timothy   Kenny (<ABBR title= "Primary">P</ABBR>)<a href="mailto:Tim.Kenny@blinn.edu"    target="Timothy Kenny" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  <tr>
  <th CLASS="ddtitle" scope="colgroup" ><a href="/PROD/bwckschd.p_disp_detail_sched?term_in=202310&amp;crn_in=19450">Principles of Accounting - Managerial<BR><b>Flex Online - 19450 - ACCT 2302 - N22</a></th>
  </tr>
  <tr>
  <TD CLASS="dddefault">
  <B>Delivery: </B><A HREF="http://www.blinn.edu/online/types-of-dl-courses.html" target="_blank"><U>Online (Internet) Course</U></a> <- Click for more information.<BR>
  <B>Term</B>: This is a <B>second 8-week session</B> online course.<BR>
  <B>Some assessments may require proctoring.</B><BR>
  <br />
  <SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2022 
  <br />
  <SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2022 to Oct 25, 2022 
  <br />
  <SPAN class="fieldlabeltext">Levels: </SPAN>Undergraduate 
  <br />
  <br />
  Distance Education Campus
  <br />
  Lecture Schedule Type
  <br />
  Flex Online Instructional Method
  <br />
         3.000 Credits
  <br />
  <a href="/PROD/bwckctlg.p_display_courses?term_in=202310&amp;one_subj=ACCT&amp;sel_crse_strt=2302&amp;sel_crse_end=2302&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Catalog Entry</a>
  <br />
  <br />
  <table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
  <tr>
  <th CLASS="ddheader" scope="col" >Type</th>
  <th CLASS="ddheader" scope="col" >Time</th>
  <th CLASS="ddheader" scope="col" >Days</th>
  <th CLASS="ddheader" scope="col" >Where</th>
  <th CLASS="ddheader" scope="col" >Date Range</th>
  <th CLASS="ddheader" scope="col" >Schedule Type</th>
  <th CLASS="ddheader" scope="col" >Instructors</th>
  </tr>
  <tr>
  <td CLASS="dddefault">Class</td>
  <td CLASS="dddefault"><ABBR title = "To Be Announced">TBA</ABBR></td>
  <td CLASS="dddefault">&nbsp;</td>
  <td CLASS="dddefault">Online Class - Second 8 week </td>
  <td CLASS="dddefault">Oct 24, 2022 - Dec 14, 2022</td>
  <td CLASS="dddefault">Lecture</td>
  <td CLASS="dddefault">Rebecca R  Barta (<ABBR title= "Primary">P</ABBR>)<a href="mailto:rebecca.barta@blinn.edu"    target="Rebecca R. Barta" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mail"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
  </tr>
  </table>
  <br />
  <br />
  </TD>
  </tr>
  </table>
  <br />
  <table  CLASS="datadisplaytable" summary="This is for formatting of the bottom links." WIDTH="50%">
  <tr>
  <TD CLASS="ntdefault">
  <a href="javascript:history.go(-1)" onMouseOver="window.status='Return to Previous';  return true" onFocus="window.status='Return to Previous';  return true" onMouseOut="window.status='';  return true"onBlur="window.status='';  return true">Return to Previous</a>
  </TD>
  </tr>
  </table>
  
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
  const courses = extractCourses(document);
  assertEquals(courses, expectedCourses as Course[]);
});
