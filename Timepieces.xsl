<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:template match="/">
                <table id="menuTable" class="indent">
                    <thead>
                        <tr>
                            <th colspan="6">Timepieces Catalogue</th>
                        </tr>
                        <tr>
                            <th class="select">Select</th>
                            <th class="brand">Brand</th>
                            <th class="price">Price</th>
                            <th class="precision">Certified Precision</th>
                            <th class="discount">Discount</th>
                            <th class="stock">Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        <xsl:for-each select="/catalogue/section">
                            <tr>
                                <td colspan="6">
                                    <xsl:value-of select="@name" />
                                </td>
                            </tr>
                            <xsl:for-each select="watch">
                            <tr id="{position()}">
                                <xsl:attribute name="original">
                                    <xsl:value-of select="boolean(./@original)" />
                                </xsl:attribute>
                                <td align="center">
                                    <input name="item0" type="checkbox" />
                                </td>
                                <td>
                                    <xsl:value-of select="brand" />
                                </td>
                                <td align="right">
                                    <xsl:value-of select="price" />
                                </td>
                                 <td align="right">
                                        <xsl:value-of select="precision" />
                                    </td>
                                    <td align="right">
                                        <xsl:value-of select="discount" />
                                    </td>
                                    <td align="right">
                                        <xsl:value-of select="stock" />
                                    </td>
                            </tr>
                            </xsl:for-each>
                        </xsl:for-each>
                    </tbody>
                </table><br/>
    </xsl:template>
</xsl:stylesheet>

<!-- The above code belongs to the github account: https://github.com/mikhail-cct/CA1-In-class-Demo.git, -->
<!-- which was adjusted and mofidied in order to create the "Timepieces" Web App -->