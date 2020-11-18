const emailGenerator = (email, user, cart, totalPrice) => {
  return {
    from: `Fullsnack Sweet Shop <me@${process.env.DOMAIN}>`,
    /* the to: line should reference the buyer's email but that
    required my credit card information :( so sending to only one
    email address for free to verify functionality */
    to: `${email}`,
    subject: `Thanks for shopping with us!`,
    html: `<html>
    <body itemscope itemtype="http://schema.org/EmailMessage" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="em_full_wrap" align="center"  bgcolor="#efefef">
        <tr>
          <td align="center" valign="top"><table align="center" width="650" border="0" cellspacing="0" cellpadding="0" class="em_main_table" style="width:650px; table-layout:fixed;">
              <tr>
                <td align="center" valign="top" style="padding:0 25px;" class="em_aside10"><table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                  <tr>
                    <td height="26" style="height:26px;" class="em_h20">&nbsp;</td>
                  </tr>
                  <tr>
                    <td align="center" valign="top"><a href="#" target="_blank" style="text-decoration:none;"></a></td>
                  </tr>
                  <tr>
                    <td height="28" style="height:28px;" class="em_h20">&nbsp;</td>
                  </tr>
                </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
    </table>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="em_full_wrap" align="center" bgcolor="#efefef">
        <tr>
          <td align="center" valign="top" class="em_aside5"><table align="center" width="650" border="0" cellspacing="0" cellpadding="0" class="em_main_table" style="width:650px; table-layout:fixed;">
              <tr>
                <td align="center" valign="top" style="padding:0 25px; background-color:#ffffff;" class="em_aside10"><table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                  <tr>
                    <td height="25" style="height:25px;" class="em_h10">&nbsp;</td>
                  </tr>
                  <tr>
                    <td valign="top" align="center"></td>
                  </tr>
                  <tr>
                    <td height="22" style="height:22px;" class="em_h20">&nbsp;</td>
                  </tr>
                  <tr>
                    <td class="em_blue em_font_22" align="center" valign="top" style="font-family: Arial, sans-serif; font-size: 26px; line-height: 29px; color:#264780; font-weight:bold;">Your Taste Buds Thank You</td>
                  </tr>
                  <tr>
                    <td height="15" style="height:15px; font-size:0px; line-height:0px;">&nbsp;</td>
                  </tr>
                  <tr>
                    <td class="em_grey" align="center" valign="top" style="font-family: Arial, sans-serif; font-size: 16px; line-height: 22px; color:#434343;">${user.firstName}, thanks so much for choosing Fullsnack Sweet Shop for your candy needs.<br class="em_hide" />
    We’ve received your order and the packing of snacks has&nbsp;begun.</td>
                  </tr>
                  <tr>
                    <td height="15" style="height:15px; font-size:1px; line-height:1px;">&nbsp;</td>
                  </tr>
                  <tr>
                    <td class="em_grey" align="center" valign="top" style="font-family: Arial, sans-serif; font-size: 16px; line-height: 22px; color:#434343;"><span class="em_hide2"></span><span class="em_mob_block"></span> <strong>Order Date:</strong> October 29, 2019</td>
                  </tr>
                  <tr>
                    <td height="20" style="height:20px; font-size:1px; line-height:1px;">&nbsp;</td>
                  </tr>
                  <tr>
                    <td align="center" valign="top"><table width="145" style="width:145px; background-color:#6bafb2; border-radius:4px;" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#6bafb2">
                    </table>
                    </td>
                  </tr>
                  <tr>
                    <td height="40" style="height:40px;" class="em_h10">&nbsp;</td>
                  </tr>

                </table>
                </td>
              </tr>
              <tr>
                <td height="15" class="em_h10" style="height:15px; font-size:1px; line-height:1px;">&nbsp;</td>
              </tr>
              <tr>
                <td align="center" valign="top" style="padding:0 50px; background-color:#ffffff;" class="em_aside10">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                  <tr>
                    <td height="35" style="height:35px;" class="em_h10">&nbsp;</td>
                  </tr>
                  <tr>
                    <td class="em_grey" align="center" valign="top" style="font-family: Arial, sans-serif; font-size: 18px; line-height: 22px; color:#434343; font-weight:bold;">BILLED TO:</td>
                  </tr>
                  <tr>
                    <td height="10" style="height:10px; font-size:1px; line-height:1px;">&nbsp;</td>
                  </tr>

                  <tr>
                    <td class="em_grey" align="center" valign="top" style="font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; color:#434343;">${user.firstName} ${user.lastName}</td>
                  </tr>
                  <tr>
                    <td height="20" style="height:20px; font-size:1px; line-height:1px;">&nbsp;</td>
                  </tr>

                  <tr>
                    <td height="25" class="em_h20" style="height:25px; font-size:1px; line-height:1px;">&nbsp;</td>
                  </tr>

                  <tr>
                    <td valign="top" align="center">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                          <tr>
                            <td valign="top">
                              <table width="120" border="0" cellspacing="0" cellpadding="0" align="left" style="width:120px;" class="em_wrapper">
                                  <tr>
                                    <td valign="top" align="center"></td>
                                  </tr>
                                </table>
                                <table width="25" border="0" cellspacing="0" cellpadding="0" align="left" style="width:25px;" class="em_hide">
                                  <tr>
                                    <td valign="top" align="left" width="25" style="width:25px;" class="em_hide">&nbsp;</td>
                                  </tr>
                                </table>
                                <table width="405" border="0" cellspacing="0" cellpadding="0" align="left" style="width:405px;" class="em_wrapper">
                                  <tr>
                                    <td height="16" style="height:16px; font-size:1px; line-height:1px;">&nbsp;</td>
                                  </tr>
                                  ${cart}
                                </table>
                            </td>
                          </tr>
                        </table>
                    </td>
                  </tr>
                  <tr>
                    <td height="25" class="em_h20" style="height:25px; font-size:1px; line-height:1px;">&nbsp;</td>
                  </tr>
                  <tr>
                    <td height="1" bgcolor="#efefef" style="height:1px; background-color:#efefef; font-size:0px; line-height:0px;"><img src="/assets/pilot/images/templates/spacer.gif" width="1" height="1" alt="" border="0" style="display:block;" /></td>
                  </tr>
                  <tr>
                    <td height="21" class="em_h20" style="height:21px; font-size:1px; line-height:1px;">&nbsp;</td>
                  </tr>
                  <tr>
                  </tr>
                  <tr>
                  </tr>
                  <tr>
                    <td valign="top" align="right">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" align="right">
                          <tr>
                            <td>&nbsp;</td>
                            <td class="em_grey" width="100" align="right" valign="top" style="font-family: Arial, sans-serif; font-size: 16px; line-height: 20px; color:#434343; width:100px; font-weight:bold;">Total</td>
                            <td width="20" style="width:20px; font-size:0px; line-height:0px;"></td>
                            <td width="100" class="em_grey" align="right" valign="top" style="font-family: Arial, sans-serif; font-size: 16px; line-height: 20px; color:#434343; width:100px; font-weight:bold;">$${totalPrice}</td>
                          </tr>
                        </table>
                    </td>
                  </tr>
                  <tr>
                    <td height="36" style="height:36px;" class="em_h10">&nbsp;</td>
                  </tr>
                </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
    </table>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="em_full_wrap" align="center" bgcolor="#efefef">
        <tr>
          <td align="center" valign="top"><table align="center" width="650" border="0" cellspacing="0" cellpadding="0" class="em_main_table" style="width:650px; table-layout:fixed;">
              <tr>
                <td align="center" valign="top" style="padding:0 25px;" class="em_aside10"><table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                  <tr>
                    <td height="40" style="height:40px;" class="em_h20">&nbsp;</td>
                  </tr>
                  <tr>
                  </tr>
                  <tr>
                    <td height="16" style="height:16px; font-size:1px; line-height:1px; height:16px;">&nbsp;</td>
                  </tr>
                  <tr>
                    <td class="em_grey" align="center" valign="top" style="font-family: Arial, sans-serif; font-size: 15px; line-height: 18px; color:#434343; font-weight:bold;">Problems or questions?</td>
                  </tr>
                  <tr>
                    <td height="10" style="height:10px; font-size:1px; line-height:1px;">&nbsp;</td>
                  </tr>
                  <tr>
                    <td align="center" valign="top" style="font-size:0px; line-height:0px;"><table border="0" cellspacing="0" cellpadding="0" align="center">
                      <tr>
                        <td width="15" align="left" valign="middle" style="font-size:0px; line-height:0px; width:15px;"><a href="mailto:fullsnack@sweetshop.com" style="text-decoration:none;"><img src="/assets/pilot/images/templates/email_img.png" width="15" height="12" alt="" border="0" style="display:block; max-width:15px;" /></a></td>
                        <td width="9" style="width:9px; font-size:0px; line-height:0px;" class="em_w5"><img src="/assets/pilot/images/templates/spacer.gif" width="1" height="1" alt="" border="0" style="display:block;" /></td>
                        <td class="em_grey em_font_11" align="left" valign="middle" style="font-family: Arial, sans-serif; font-size: 13px; line-height: 15px; color:#434343;"><a href="mailto:fullsnack@sweetshop.com" style="text-decoration:none; color:#434343;">fullsnack@sweetshop.com.com</a> <a href="mailto:marketing@mailgun.com" style="text-decoration:none; color:#434343;">[mailto:marketing@mailgun.com]</a></td>
                      </tr>
                    </table>
                    </td>
                  </tr>
                   <tr>
                    <td height="9" style="font-size:0px; line-height:0px; height:9px;" class="em_h10"><img src="/assets/pilot/images/templates/spacer.gif" width="1" height="1" alt="" border="0" style="display:block;" /></td>
                  </tr>
                   <tr>
                    <td align="center" valign="top"><table border="0" cellspacing="0" cellpadding="0" align="center">
                      <tr>
                        <td width="12" align="left" valign="middle" style="font-size:0px; line-height:0px; width:12px;"><a href="#" target="_blank" style="text-decoration:none;"><img src="/assets/pilot/images/templates/img_1.png" width="12" height="16" alt="" border="0" style="display:block; max-width:12px;" /></a></td>
                        <td width="7" style="width:7px; font-size:0px; line-height:0px;" class="em_w5">&nbsp;</td>
                        <td class="em_grey em_font_11" align="left" valign="middle" style="font-family: Arial, sans-serif; font-size: 13px; line-height: 15px; color:#434343;"><a href="#" target="_blank" style="text-decoration:none; color:#434343;">Fullsnack Sweet Shop</a> &bull; 5 Hanover Square &bull; New York, NY 95389</td>
                      </tr>
                    </table>
                    </td>
                  </tr>
                  <tr>
                    <td height="35" style="height:35px;" class="em_h20">&nbsp;</td>
                  </tr>
                </table>
                </td>
              </tr>
               <tr>
                <td height="1" bgcolor="#dadada" style="font-size:0px; line-height:0px; height:1px;"><img src="/assets/pilot/images/templates/spacer.gif" width="1" height="1" alt="" border="0" style="display:block;" /></td>
              </tr>
               <tr>
                <td align="center" valign="top" style="padding:0 25px;" class="em_aside10"><table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                  <tr>
                    <td height="16" style="font-size:0px; line-height:0px; height:16px;">&nbsp;</td>
                  </tr>
                  <tr>
                    <td align="center" valign="top"><table border="0" cellspacing="0" cellpadding="0" align="left" class="em_wrapper">
                      <tr>
                        <td class="em_grey" align="center" valign="middle" style="font-family: Arial, sans-serif; font-size: 11px; line-height: 16px; color:#434343;">&copy; Meowgun 2019  &nbsp;|&nbsp;  <a href="#" target="_blank" style="text-decoration:underline; color:#434343;">Unsubscribe</a></td>
                      </tr>
                    </table>
                    </td>
                  </tr>
                  <tr>
                    <td height="16" style="font-size:0px; line-height:0px; height:16px;">&nbsp;</td>
                  </tr>
                </table>
                </td>
              </tr>
              <tr>
                <td class="em_hide" style="line-height:1px;min-width:650px;background-color:#efefef;"><img alt="" src="/assets/pilot/images/templates/spacer.gif" height="1" width="650" style="max-height:1px; min-height:1px; display:block; width:650px; min-width:650px;" border="0" /></td>
              </tr>
            </table>
          </td>
        </tr>
    </table>
    </body>
    </html>`,
  }
}

module.exports = emailGenerator
