/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements. See the NOTICE file distributed with this
 * work for additional information regarding copyright ownership. The ASF
 * licenses this file to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

// This code is structured on to require a 'new' of an object of type
// CxfApacheOrgUtil.
// Alternative, it could be made 'static', but this allowed us to use this same
// object to carry some state.
var org_apache_cxf_XSI_namespace_uri = "http://www.w3.org/2001/XMLSchema-instance";
var org_apache_cxf_XSD_namespace_uri = "http://www.w3.org/2001/XMLSchema";

function cxf_apache_org_util_null_trace(message) {
}

function CxfApacheOrgUtil() {
	// Set up tracing if there is a trace object.
	if ("object" == typeof(org_apache_cxf_trace)) {
		this.trace = org_apache_cxf_trace.trace;
		this.trace("Javascript tracing enabled.");
	} else if ("function" == typeof(org_apache_cxf_trace)) {
		this.trace = org_apache_cxf_trace;
		this.trace("Javascript tracing enabled.");
	} else {
		this.trace = cxf_apache_org_util_null_trace;
	}
}

// define a constant for the DOM node type for an element.
CxfApacheOrgUtil.prototype.ELEMENT_NODE = 1;

// compensate for Microsoft's weakness here.
function org_apache_cxf_getNodeLocalName(node) {
	if ("localName" in node) {
		return node.localName;
	} else {
		return node.baseName;
	}
}

CxfApacheOrgUtil.prototype.getNodeLocalName = org_apache_cxf_getNodeLocalName;

// compensate for lack of namespace support in IE.
function org_apache_cxf_getNamespaceURI(elementNode, namespacePrefix) {
	var namespaceURI = null;
	if (elementNode.nodeType == 9)
		return null;
	else {
		namespaceURI = org_apache_cxf_findNamespace(elementNode,
				namespacePrefix);
		if (namespaceURI == null)
			namespaceURI = org_apache_cxf_getNamespaceURI(
					elementNode.parentNode, namespacePrefix);
		else
			return namespaceURI;
	}
	return namespaceURI;
}

// Search through the attributes of one node to find a namespace prefix definition.
function org_apache_cxf_findNamespace(elementNode, namespacePrefix) {
	var attributes = elementNode.attributes;
	if ((attributes != null) && (attributes.length > 0)) {
		for (var x = 0;x < attributes.length; x++) {
			var attributeNodeName = attributes.item(x).nodeName;
			var attributeNamespacePrefix = org_apache_cxf_getPrefix(attributes
					.item(x).nodeName);
			var attributeNamespaceSuffix = org_apache_cxf_getLocalName(attributes
					.item(x).nodeName);

			if ((namespacePrefix == null) && (attributeNamespacePrefix == null)
					&& (attributeNamespaceSuffix == "xmlns"))
				return attributes.item(x).nodeValue;
			else if ((attributeNamespacePrefix == "xmlns")
					&& (attributeNamespaceSuffix == namespacePrefix))
				return attributes.item(x).nodeValue;
		}
		return null;
	}
}

// Get namespace for a node.
function org_apache_cxf_get_node_namespaceURI(elementNode) {
	var prefix = org_apache_cxf_getPrefix(elementNode.nodeName);
	return org_apache_cxf_getNamespaceURI(elementNode, prefix);
}

CxfApacheOrgUtil.prototype.getElementNamespaceURI = org_apache_cxf_get_node_namespaceURI;

// Supprt functions for xsd:any start here.

// Object that can test an element against an 'any' specification.
function org_apache_cxf_any_ns_matcher(style, tns, nslist, nextLocalPart) {
	this.style = style;
	this.tns = tns;
	this.nslist = nslist;
	this.nextLocalPart = nextLocalPart;
}

org_apache_cxf_any_ns_matcher.ANY = "##any";
org_apache_cxf_any_ns_matcher.OTHER = "##other";
org_apache_cxf_any_ns_matcher.LOCAL = "##local";
org_apache_cxf_any_ns_matcher.LISTED = "listed";

function org_apache_cxf_any_ns_matcher_match(namespaceURI, localName) {
	switch (this.style) {
		// should this match local elements?
		case org_apache_cxf_any_ns_matcher.ANY :
			return true;
		case org_apache_cxf_any_ns_matcher.OTHER :
			return namespaceURI != this.tns;
		case org_apache_cxf_any_ns_matcher.LOCAL :
			return namespaceURI == null || namespaceURI == '';
		case org_apache_cxf_any_ns_matcher.LISTED :
			for (var x in this.nslist) {
				var ns = this.nslist[x];
				if (ns == "##local") {
					if ((namespaceURI == null || namespaceURI == '')
							&& (this.nextLocalPart != null && localName != this.nextLocalPart))
						return true;
				} else {
					if (ns == namespaceURI)
						return true;
				}
			}
			return false;
	}
}

org_apache_cxf_any_ns_matcher.prototype.match = org_apache_cxf_any_ns_matcher_match;

function org_apache_cxf_getPrefix(tagName) {
	var prefix;
	var prefixIndex = tagName.indexOf(":");
	if (prefixIndex == -1)
		return null;
	else
		return prefix = tagName.substring(0, prefixIndex);
}

function org_apache_cxf_getLocalName(tagName) {
	var suffix;
	var prefixIndex = tagName.indexOf(":");

	if (prefixIndex == -1)
		return tagName;
	else
		return suffix = tagName.substring(prefixIndex + 1, tagName.length);
}

function org_apache_cxf_element_name_for_trace(node) {
	if (node == null)
		return "Null";
	else if (node == undefined)
		return "Undefined";
	else {
		var n = '';
		if (node.namespaceURI != null && node.namespaceURI != '') {
			n = n + "{" + node.namespaceURI + "}";
		}
		return n + this.getNodeLocalName(node);
	}
}

CxfApacheOrgUtil.prototype.traceElementName = org_apache_cxf_element_name_for_trace;

function org_apache_cxf_escapeXmlEntities(val) {
	if (val == null || val == undefined)
		return "";
	else {
		val = String(val);
		return val.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g,
				"&gt;");
	}
}

CxfApacheOrgUtil.prototype.escapeXmlEntities = org_apache_cxf_escapeXmlEntities;

// Is an element xsi:nil? Note, in IE this requires the use of the prefix 'xsi', literally.
function org_apache_cxf_isElementNil(node) {
	if (node == null)
		throw "null node passed to isElementNil";
	// we need to look for an attribute xsi:nil, where xsi is
	// http://www.w3.org/2001/XMLSchema-instance. we have the usual
	// problem here with namespace-awareness.
	if ('function' == typeof node.getAttributeNS) {
		var nillness = node.getAttributeNS(
				"http://www.w3.org/2001/XMLSchema-instance", "nil");
		return nillness != null && nillness == "true";
	} else { // we assume the standard prefix and hope for the best.
		var nillness = node.getAttribute("xsi:nil");
		return nillness != null && nillness == "true";
	}
}

CxfApacheOrgUtil.prototype.isElementNil = org_apache_cxf_isElementNil;

function org_apache_cxf_getFirstElementChild(node) {
	if (node == undefined)
		throw "undefined node to getFirstElementChild";

	var n;
	for (n = node.firstChild;n != null && n.nodeType != this.ELEMENT_NODE; n = n.nextSibling) {
	}

	return n;
}

CxfApacheOrgUtil.prototype.getFirstElementChild = org_apache_cxf_getFirstElementChild;

function org_apache_cxf_getNextElementSibling(node) {
	if (node == undefined)
		throw "undefined node to getNextElementSibling";
	if (node == null)
		throw "null node to getNextElementSibling";
	var n;
	for (n = node.nextSibling;n != null && n.nodeType != this.ELEMENT_NODE; n = n.nextSibling);
	return n;
}

CxfApacheOrgUtil.prototype.getNextElementSibling = org_apache_cxf_getNextElementSibling;

function org_apache_cxf_isNodeNamedNS(node, namespaceURI, localName) {
	if (node == undefined)
		throw "undefined node to isNodeNamedNS";

	if (namespaceURI == '' || namespaceURI == null) {
		if (node.namespaceURI == '' || node.namespaceURI == null) {
			return localName == org_apache_cxf_getNodeLocalName(node);
		} else
			return false;
	} else {
		return namespaceURI == node.namespaceURI
				&& localName == org_apache_cxf_getNodeLocalName(node);
	}
}

CxfApacheOrgUtil.prototype.isNodeNamedNS = org_apache_cxf_isNodeNamedNS;

// Firefox splits large text regions into multiple Text objects (4096 chars in
// each). Glue it back together.
function org_apache_cxf_getNodeText(node) {
	var r = "";
	for (var x = 0;x < node.childNodes.length; x++) {
		r = r + node.childNodes[x].nodeValue;
	}
	return r;
}

CxfApacheOrgUtil.prototype.getNodeText = org_apache_cxf_getNodeText;

// This always uses soap-env, soap, and xsi as prefixes.
function org_apache_cxf_begin_soap11_message(namespaceAttributes) {
	var value = '<?xml version="1.0" encoding="UTF-8"?>'
			+ '<soap-env:Envelope xmlns:soap-env="http://schemas.xmlsoap.org/soap/envelope/"'
			+ ' xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"'
			+ ' xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"'
			+ '><soap-env:Body ' + namespaceAttributes + '>';
	return value;
}

CxfApacheOrgUtil.prototype.beginSoap11Message = org_apache_cxf_begin_soap11_message;

function org_apache_cxf_end_soap11_message() {
	return '</soap-env:Body></soap-env:Envelope>';
}

CxfApacheOrgUtil.prototype.endSoap11Message = org_apache_cxf_end_soap11_message;

var org_apache_cxf_base64_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function org_apache_cxf_base64_encode64array(input) {
	var output = "";
	var chr1, chr2, chr3;
	var enc1, enc2, enc3, enc4;
	var i = 0;

	do {
		var count = 1;
		chr1 = chr2 = chr3 = 0;

		chr1 = input[i++];
		if (i < input.length) {
			chr2 = input[i++];
			count++;
		}

		if (i < input.length) {
			chr3 = input[i++];
			count++;
		}

		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		if (count > 1) {
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			if (count > 2)
				enc4 = chr3 & 63;
			else
				enc4 = 64;
		} else
			enc3 = enc4 = 64;

		output = output + org_apache_cxf_base64_keyStr.charAt(enc1)
				+ org_apache_cxf_base64_keyStr.charAt(enc2)
				+ org_apache_cxf_base64_keyStr.charAt(enc3)
				+ org_apache_cxf_base64_keyStr.charAt(enc4);
	} while (i < input.length);

	return output;
}

function org_apache_cxf_base64_encode64Unicode(input) {
	var data = new Array(2 + (input.length * 2));
	data[0] = 0xff;
	data[1] = 0xfe;
	for (var x = 0;x < input.length; x++) {
		var c = input.charCodeAt(x);
		data[2 + (x * 2)] = c & 0xff;
		data[3 + (x * 2)] = (c >> 8) & 0xff;
	}
	return encode64array(data);
}

// we may be able to do this more cleanly with unescape( encodeURIComponent(
// input ) );
function org_apache_cxf_base64_encode64UTF8(input) {

	// determine how many bytes are needed for the complete conversion
	var bytesNeeded = 0;
	for (var i = 0;i < input.length; i++) {
		if (input.charCodeAt(i) < 0x80) {
			++bytesNeeded;
		} else if (input.charCodeAt(i) < 0x0800) {
			bytesNeeded += 2;
		} else if (input.charCodeAt(i) < 0x10000) {
			bytesNeeded += 3;
		} else {
			bytesNeeded += 4;
		}
	}

	// allocate a byte[] of the necessary size
	var data = new Array(bytesNeeded);
	// do the conversion from character code points to utf-8
	var bytes = 0;
	for (var i = 0;i < input.length; i++) {
		if (input.charCodeAt(i) < 0x80) {
			data[bytes++] = input.charCodeAt(i);
		} else if (input.charCodeAt(i) < 0x0800) {
			data[bytes++] = ((input.charCodeAt(i) >> 6) | 0xC0);
			data[bytes++] = ((input.charCodeAt(i) & 0x3F) | 0x80);
		} else if (input.charCodeAt(i) < 0x10000) {
			data[bytes++] = ((input.charCodeAt(i) >> 12) | 0xE0);
			data[bytes++] = (((input.charCodeAt(i) >> 6) & 0x3F) | 0x80);
			data[bytes++] = ((input.charCodeAt(i) & 0x3F) | 0x80);
		} else {
			data[bytes++] = ((input.charCodeAt(i) >> 18) | 0xF0);
			data[bytes++] = (((input.charCodeAt(i) >> 12) & 0x3F) | 0x80);
			data[bytes++] = (((input.charCodeAt(i) >> 6) & 0x3F) | 0x80);
			data[bytes++] = ((input.charCodeAt(i) & 0x3F) | 0x80);
		}
	}
	return encode64array(data);
}

function org_apache_cxf_base64_decode64array(input) {
	var output = new Array();
	var chr1, chr2, chr3;
	var enc1, enc2, enc3, enc4;
	var i = 0;

	// remove all characters that are not A-Z, a-z, 0-9, +, /, or =
	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

	do {
		enc1 = org_apache_cxf_base64_keyStr.indexOf(input.charAt(i++));
		enc2 = org_apache_cxf_base64_keyStr.indexOf(input.charAt(i++));
		enc3 = org_apache_cxf_base64_keyStr.indexOf(input.charAt(i++));
		enc4 = org_apache_cxf_base64_keyStr.indexOf(input.charAt(i++));

		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;

		output[output.length] = chr1;

		if (enc3 != 64) {
			output[output.length] = chr2;
		}
		if (enc4 != 64) {
			output[output.length] = chr3;
		}
	} while (i < input.length);

	return output;
}

var org_apache_cxf_base64_hD = "0123456789ABCDEF";
function org_apache_cxf_base64_d2h(d) {
	var h = org_apache_cxf_base64_hD.substr(d & 15, 1);
	while (d > 15) {
		d >>= 4;
		h = org_apache_cxf_base64_hD.substr(d & 15, 1) + h;
	}
	return h;
}

function org_apache_cxf_base64_decode64Unicode(input) {
	var bytes = org_apache_cxf_base64_decode64array(input);
	var swap;
	var output = "";
	if (bytes[0] == 0xff && bytes[1] == 0xfe) {
		swap = true;
	} else if (bytes[0] == 0xfe && bytes[1] == 0xff) {
		swap = false;
	} else {
		confirm("Problem with decoding utf-16");
	}
	for (var x = 2;x < bytes.length; x = x + 2) {
		var c;
		if (swap)
			c = (bytes[x + 1] << 8) | bytes[x];
		else
			c = (bytes[x] << 8) | bytes[x + 1];

		output = output + String.fromCharCode(c);
	}
	return output;
}

// we may be able to do this more cleanly with decodeURIComponent( escape( input
// ) );
function org_apache_cxf_base64_decode64UTF8(input) {
	var utftext = org_apache_cxf_base64_decode64array(input);
	var plaintext = "";
	var cRay = new Array();
	var i = 0;
	var c;
	var c2;
	var c3;
	while (i < utftext.length) {
		c = utftext[i];
		if (c < 128) {
			plaintext += String.fromCharCode(c);
			i++;
		} else if ((c > 191) && (c < 224)) {
			c2 = utftext[i + 1];
			plaintext += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
			i += 2;
		} else {
			c2 = utftext[i + 1];
			c3 = utftext[i + 2];
			plaintext += String.fromCharCode(((c & 15) << 12)
					| ((c2 & 63) << 6) | (c3 & 63));
			i += 3;
		}
	}
	return plaintext;
}

// MTOM deserialization.
// This assumes that the only content type it will be asked to deal with is text/plain;charset=utf-8.
// This only handles cid: xop URNs.

var org_apache_cxf_XOP_NS = 'http://www.w3.org/2004/08/xop/include';

function org_apache_cxf_deserialize_MTOM_or_base64(element) {
	var elementChild = this.getFirstElementChild(element);
	if (elementChild == null) { // no MTOM, assume base64
		var base64Text = this.getNodeText(element);
		// we assume this is text/plain;charset=utf-8. We could check for the
		// xmime attribute.
		return org_apache_cxf_base64_decode64UTF8(base64Text);
	}
	// 
	if (!org_apache_cxf_isNodeNamedNS(elementChild, org_apache_cxf_XOP_NS, 'Include')) {
		this.trace('Invalid child element of base64 element');
		return ''; // we don't knoww what this is, so we throw it out. We could
					// throw.
	}
	var href = elementChild.getAttribute('href');
	if(!href) {
		this.trace('missing href for xop:Include');
		return ''; // we don't knoww what this is, so we throw it out. We could
					// throw.
	}
	// we only support cid:, not URLs.
	if(href.length < 4 || href.substr(0, 4) != 'cid:') {
		this.trace('Non-cid href in xop:Include: ' + href);
		return ''; 
	}
	var cid = href.substr(4);
	var partobject = this.client.parts[cid];
	if(!partobject) {
		this.trace('xop:Include href points to missing attachment: ' + href);
		return ''; 
	}
	// success.
	return partobject.data;
}

CxfApacheOrgUtil.prototype.deserializeBase64orMom = org_apache_cxf_deserialize_MTOM_or_base64;

/*
 * Client object sends requests and calls back with responses.
 */
function CxfApacheOrgClient(utils) {
	utils.trace("Client constructor");
	this.utils = utils;
	utils.client = this; // we aren't worried about multithreading!
	this.mtomparts = [];
	this.soapAction = "";
	this.messageType = "CALL";
	// handler functions
	this.onsuccess = null;
	this.onerror = null;
	// Firefox is noncompliant with respect to the defined constants,
	// so we define our own.
	this.READY_STATE_UNINITIALIZED = 0;
	this.READY_STATE_LOADING = 1;
	this.READY_STATE_LOADED = 2;
	this.READY_STATE_INTERACTIVE = 3;
	this.READY_STATE_DONE = 4;
}

var org_apache_cxf_pad_string_PAD_LEFT = 0;
var org_apache_cxf_pad_string_PAD_RIGHT = 1;
var org_apache_cxf_pad_string_PAD_BOTH = 2;

function org_apache_cxf_pad_string(string, len, pad, type) {
	var append = new String();

	len = isNaN(len) ? 0 : len - string.length;
	pad = typeof(pad) == 'string' ? pad : ' ';

	if (type == org_apache_cxf_pad_string_PAD_BOTH) {
		string = org_apache_cxf_pad_sring(Math.floor(len / 2) + string.length,
				pad, org_apache_cxf_pad_string_PAD_LEFT);
		return (org_apache_cxf_pad_string(Math.ceil(len / 2) + string.length,
				pad, org_apache_cxf_pad_string_PAD_RIGHT));
	}

	while ((len -= pad.length) > 0)
		append += pad;
	append += pad.substr(0, len + pad.length);

	return (type == org_apache_cxf_pad_string_PAD_LEFT
			? append.concat(string)
			: string.concat(append));
}

/*
 * Generate a uniformly distributed random integer within the range <min> ..
 * <max>. (min) - Lower limit: random >= min (default: 0) (max) - Upper limit:
 * random <= max (default: 1)
 */
function org_apache_cxf_random_int(min, max) {
	if (!isFinite(min))
		min = 0;
	if (!isFinite(max))
		max = 1;
	return Math.floor((Math.random() % 1) * (max - min + 1) + min);
}

function org_apache_cxf_random_hex_string(len) {
	var random = org_apache_cxf_random_int(0, Math.pow(16, len) - 1);
	return org_apache_cxf_pad_string(random.toString(16), len, '0',
			org_apache_cxf_pad_string_PAD_LEFT);
}

function org_apache_cxf_make_uuid(type) {
	switch ((type || 'v4').toUpperCase()) {
		// Version 4 UUID (Section 4.4 of RFC 4122)
		case 'V4' :
			var tl = org_apache_cxf_random_hex_string(8);
			// time_low
			var tm = org_apache_cxf_random_hex_string(4);
			// time_mid
			var thav = '4' + org_apache_cxf_random_hex_string(3);
			// time_hi_and_version
			var cshar = org_apache_cxf_random_int(0, 0xFF);
			// clock_seq_hi_and_reserved
			cshar = ((cshar & ~(1 << 6)) | (1 << 7)).toString(16);
			var csl = org_apache_cxf_random_hex_string(2);
			// clock_seq_low
			var n = org_apache_cxf_random_hex_string(12);
			// node

			return (tl + '-' + tm + '-' + thav + '-' + cshar + csl + '-' + n);

			// Nil UUID (Section 4.1.7 of RFC 4122)
		case 'NIL' :
			return '00000000-0000-0000-0000-000000000000';
	}
	return null;
}

//
// Returns XMLHttpRequest object.
//
var ORG_APACHE_CXF_XMLHTTPREQUEST_MS_PROGIDS = new Array(
    "Msxml2.XMLHTTP.7.0",
    "Msxml2.XMLHTTP.6.0",
    "Msxml2.XMLHTTP.5.0",
    "Msxml2.XMLHTTP.4.0",
    "MSXML2.XMLHTTP.3.0",
    "MSXML2.XMLHTTP",
    "Microsoft.XMLHTTP"
    );    

function org_apache_cxf_getXMLHttpRequest()
{
    var httpRequest = null;
 
    // Create the appropriate HttpRequest object for the browser.
    try {
        httpRequest = new XMLHttpRequest();
        return httpRequest;
    } catch(ex) {
    }
    
    if (window.ActiveXObject != null) {
        // Must be IE, find the right ActiveXObject.
   
        var success = false;
        //
        // Define a list of Microsoft XML HTTP ProgIDs.
        //
        for (var i = 0;
             i < ORG_APACHE_CXF_XMLHTTPREQUEST_MS_PROGIDS.length && !success;
             i++)
        {
            try
            {
                httpRequest = new ActiveXObject(ORG_APACHE_CXF_XMLHTTPREQUEST_MS_PROGIDS[i]);
                success = true;
            }
            catch (ex)
            {
                // no reason to log unless we come up empty.
            }
        }
        if(!success) {
            this.utils.trace("Unable to get any Microsoft XML HttpRequest object.");
            throw "org_apache_cxf no Microsoft XMLHttpRequest";
        }
    }
    // Return it.
    return httpRequest;
}

CxfApacheOrgClient.prototype.getXMLHttpRequest = org_apache_cxf_getXMLHttpRequest;

var ORG_APACHE_CXF_MTOM_REQUEST_HEADER = 'Content-Type: application/xop+xml; type="text/xml"; charset=utf-8\r\n';

// Caller must avoid stupid mistakes like 'GET' with a request body.
// This does not support attempts to cross-script.
// This imposes a relatively straightforward set of HTTP options.
function org_apache_cxf_client_request(url, requestXML, method, sync, headers) 
{
	this.utils.trace("request " + url);

	this.url = url;
	this.sync = sync;

	this.req = null;

	if (method) {
		this.method = method;
	} else {
		if (requestXML)
			this.method = "POST";
		else
			this.method = "GET";
	}

	try {
		this.req = this.getXMLHttpRequest();
	} catch (err) {
		this.utils.trace("Error creating XMLHttpRequest: " + err);
		this.req = null;
	}

	if (this.req == null) {
		this.utils.trace("Unable to create request object.");
		throw "ORG_APACHE_CXF_NO_REQUEST_OBJECT";
	}

	this.utils.trace("about to open " + this.method + " " + this.url);
	this.req.open(this.method, this.url, !this.sync);

	var mimeBoundary;

	// we can't do binary MTOM, but we can do 'text/plain' !
	if (this.mtomparts.length > 0) {
		var uuid = org_apache_cxf_make_uuid('v4');
		mimeBoundary = '@_bOuNDaRy_' + uuid;
		var ctHeader = 'multipart/related; start-info="text/xml"; type="application/xop+xml"; boundary="'
				+ mimeBoundary + '"';
		this.req.setRequestHeader("Content-Type", ctHeader);

	} else {
	// for now, assume SOAP 1.1. 1.2 calls for application/xml.
	// also assume we're talking Unicode here.
		this.req.setRequestHeader("Content-Type", "text/xml;charset=utf-8");
	}

	var action = this.soapAction;
	if (headers) { // must be array indexed by header field.
        // avoid extra properties on the headers.
        for (var h in headers) {
        	if (h == "SOAPAction") {
                action = headers[h];
        	} else if(headers.hasOwnProperty(h)) {
                this.req.setRequestHeader(h, headers[h]);
            }
        }
	}	

	if (action.length == 0) {
    	action = "\"\"";
	}
	if (action.charAt(0) != '"') {
    	action = '\"' + action + '\"';
	}
    
	this.req.setRequestHeader("SOAPAction", action);
	this.req.setRequestHeader("MessageType", this.messageType);

	var requester = this; /* setup a closure */

	this.req.onreadystatechange = function() {
		requester.onReadyState();
	}

	// NOTE: we do not call the onerror callback for a synchronous error
	// at request time. We let the request object throw as it will.
	// onError will only be called for asynchronous errors.
	this.utils.trace("about to send data" + this.method + " " + this.url);
	var dataToSend;
	if (this.mtomparts.length == 0) {
		dataToSend = requestXML;
	} else {
		dataToSend = "--" + mimeBoundary + "\r\n";
		dataToSend = dataToSend + ORG_APACHE_CXF_MTOM_REQUEST_HEADER + "\r\n";
		dataToSend = dataToSend + requestXML;
		for (var bx in this.mtomparts) {
			var part = this.mtomparts[bx];
			dataToSend += "\r\n\r\n--" + mimeBoundary + "\r\n";
			dataToSend += part;
		}
		dataToSend += "--" + mimeBoundary + "--\r\n";
	}

	this.req.send(dataToSend);
}

CxfApacheOrgClient.prototype.request = org_apache_cxf_client_request;

function org_apache_cxf_trim_string(str) {
	return str.replace(/^\s+|\s+$/g, '');
}

// this gets an array of a=b strings, and produces a dictionary of x[a]=b;
function org_apache_cxf_parse_mime_keyword_value_pairs(strings) {
	var result = [];
	for (var x = 1;x < strings.length; x = x + 1) {
		var str = strings[x];
		var valequal = str.indexOf("=");
		if (valequal != -1) {
			var k = str.substr(0, valequal);
			var v = str.substr(valequal + 1);
			v = org_apache_cxf_trim_string(v);
			if (v.charAt(0) == '"') {
				v = v.substr(1, v.length - 2);
			}
			if (v.charAt(0) == "'") {
				v = v.substr(1, v.length - 2);
			}

			result[org_apache_cxf_trim_string(k.toLowerCase())] = v;
		}
	}
	return result;
}

function org_apache_cxf_regexp_escape(text) {
	if (!arguments.callee.sRE) {
		var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{',
				'}', '\\'];
		arguments.callee.sRE = new RegExp('(\\' + specials.join('|\\') + ')',
				'g');
	}
	return text.replace(arguments.callee.sRE, '\\$1');
}

// Called when we don't have response XML.
// returns true if we have multipart-related, false if we don't or can't parse
// it.
function org_apache_cxf_parse_multipart_related() {
	var contentType = this.req.getResponseHeader("content-type");
	if (!contentType)
		return false; // not bloody likely.
	var ctPart = contentType.split(/\s*;\s*/);
	var ctMain = ctPart[0].toLowerCase();
	if (ctMain != "multipart/related")
		return false;
	// now we have keyword-value pairs.
	var params = org_apache_cxf_parse_mime_keyword_value_pairs(ctPart);
	// there is a lot of noise we don't care about. all we really want is the
	// boundary.
	var boundary = params['boundary'];
	if (!boundary)
		return false;
	boundary = "--" + boundary; // the annoying 'extra-dash' convention.
	// var boundarySplitter = org_apache_cxf_regexp_escape(boundary);
	var text = this.req.responseText;
	// we are willing to use a lot of memory here.
	var parts = text.split(boundary);
	// now we have the parts.
	// now we have to pull headers off the parts.
	this.parts = [];
	// the first one is noise due to the initial boundary. The last will just be
	// -- due to MIME.
	for (var px = 1;px < parts.length - 1; px++) {
		var seenOneHeader = false;
		var x = 0; // misc index.
		var parttext = parts[px];
		var headers = [];
		nextHeaderLine : for (var endX = parttext.indexOf('\r', x);endX != -1; x = endX
				+ 1, endX = parttext.indexOf('\r', x)) {
			var headerLine = parttext.slice(x, endX);
			if (headerLine == "") {
				if (parttext.charAt(endX + 1) == '\n')
					endX++;
				if (seenOneHeader) {
					break nextHeaderLine;
				} else {
					continue nextHeaderLine;
				}
			}
			seenOneHeader = true;

			var colonIndex = headerLine.indexOf(":");
            var headerName = headerLine.slice(0, colonIndex).toLowerCase();
            var headerValue = headerLine.substr(colonIndex+1);
			headers[headerName] = org_apache_cxf_trim_string(headerValue);

			if (parttext.charAt(endX + 1) == '\n')
				endX++;
		}

		// Now, see about the mime type (if any) and the ID.
		var thispart = new Object(); // a constructor seems excessive.
		// at exit, x indicates the start of the blank line.
		if (parttext.charAt(x + 1) == '\n')
			x = x + 1;
		thispart.data = parttext.substr(x);
		thispart.contentType = headers['content-type'];
		if (px > 1) {
			var cid = headers['content-id'];
			// take of < and >
			cid = cid.substr(1, cid.length - 2);
			thispart.cid = cid;
			this.parts[cid] = thispart;
		} else {
			// the first part.
			var doc;
			if (window.ActiveXObject) {
				doc = new ActiveXObject("Microsoft.XMLDOM");
				doc.async = "false";
				doc.loadXML(thispart.data);
			} else {
				var parser = new DOMParser();
				doc = parser.parseFromString(thispart.data, "text/xml");
			}
			this.mpResponseXML = doc;
		}
	}
	return true;

}

CxfApacheOrgClient.prototype.parseMultipartRelated = org_apache_cxf_parse_multipart_related;

function org_apache_cxf_client_onReadyState() {
	var req = this.req;
	var ready = req.readyState;

	this.utils.trace("onreadystatechange " + ready);

	if (ready == this.READY_STATE_DONE) {
		var httpStatus;
		try {
			httpStatus = req.status;
		} catch (e) {
			// Firefox throws when there was an error here.
			this.utils
					.trace("onreadystatechange DONE ERROR retrieving status (connection error?)");
			if (this.onerror != null) {
				this.onerror(e);
			}
			return;

		}

		this.utils.trace("onreadystatechange DONE " + httpStatus);

		if (httpStatus == 200 || httpStatus == 0) {
			if (this.onsuccess != null) {
				// the onSuccess function is generated, and picks apart the
				// response.
				if (!req.responseXML) {
					if (this.parseMultipartRelated()) {
						this.onsuccess(this, this.mpResponseXML);
						return;
					}
					if (this.onerror != null) {
						this.onerror("Could not handle content of response.");
						return;
					}
				}
				this.onsuccess(this, req.responseXML);
			}
		} else {
			this.utils.trace("onreadystatechange DONE ERROR "
					+ req.getAllResponseHeaders() + " " + req.statusText + " "
					+ req.responseText);
			if (this.onerror != null)
				this.onerror(this);
		}
	}
}

CxfApacheOrgClient.prototype.onReadyState = org_apache_cxf_client_onReadyState;

function org_apache_cxf_package_mtom(value) {
	var uuid = org_apache_cxf_make_uuid('v4');
	var placeholder = '<xop:Include xmlns:xop="http://www.w3.org/2004/08/xop/include" '
			+ 'href="cid:' + uuid + '" />';
	var mtomObject = 'Content-Type: text/plain; charset="utf-8";\r\nContent-ID: <'
			+ uuid + '>\r\n\r\n' + value + '\r\n';
	this.client.mtomparts.push(mtomObject);
	return placeholder;
}

CxfApacheOrgUtil.prototype.packageMtom = org_apache_cxf_package_mtom;

// Holder object used for xs:any
// The namespaceURI and localName identify the global element from the schema.
// The object to go with it goes into object.
// If the Any is an array, put the array into the object slot.

function org_apache_cxf_any_holder(namespaceURI, localName, object) {
	this.typeMarker = "org_apache_cxf_any_holder";
	this.namespaceURI = namespaceURI;
	this.localName = localName;
	this.qname = "{" + namespaceURI + "}" + localName;
	this.object = object;
	this.raw = false;
}

// the following will simply dump the supplied XML into the message.
function org_apache_cxf_raw_any_holder(xml) {
	this.typeMarker = "org_apache_cxf_raw_any_holder";
	this.xml = xml;
	this.raw = true;
	this.xsiType = false;
}

// The following will get an xsi:type attribute in addition to dumping the XML
// into
// the message.
function org_apache_cxf_raw_typed_any_holder(namespaceURI, localName, xml) {
	this.typeMarker = "org_apache_cxf_raw_any_holder";
	this.namespaceURI = namespaceURI;
	this.localName = localName;
	this.xml = xml;
	this.raw = true;
	this.xsiType = true;
}

function org_apache_cxf_get_xsi_type(elementNode) {
	var attributes = elementNode.attributes;
	if ((attributes != null) && (attributes.length > 0)) {
		for (var x = 0;x < attributes.length; x++) {
			var attributeNodeName = attributes.item(x).nodeName;
			var attributeNamespacePrefix = org_apache_cxf_getPrefix(attributes
					.item(x).nodeName);
			var attributeNamespaceSuffix = org_apache_cxf_getLocalName(attributes
					.item(x).nodeName);
			if (attributeNamespaceSuffix == 'type') {
				// perhaps this is ours
				var ns = org_apache_cxf_getNamespaceURI(elementNode,
						attributeNamespacePrefix);
				if (ns == org_apache_cxf_XSI_namespace_uri) {
					return attributes.item(x).nodeValue;
				}
			}
		}
		return null;
	}
}

// Return an object if we can deserialize an object, otherwise return the
// element itself.
function org_apache_cxf_deserialize_anyType(cxfjsutils, element) {
	var type = org_apache_cxf_get_xsi_type(element);
	if (type != null) {
		// type is a :-qualified name.
		var namespacePrefix = org_apache_cxf_getPrefix(type);
		var localName = org_apache_cxf_getLocalName(type);
		var uri = org_apache_cxf_getNamespaceURI(element, namespacePrefix);
		if (uri == org_apache_cxf_XSD_namespace_uri) {
			// we expect a Text node below
			var textNode = element.firstChild;
			if (textNode == null)
				return null;
			var text = textNode.nodeValue;
			if (text == null)
				return null;
			// For any of the basic types, assume that the nodeValue is what the
			// doctor ordered,
			// converted to the appropriate type.
			// For some of the more interesting types this needs more work.
			if (localName == "int" || localName == "unsignedInt"
					|| localName == "long" || localName == "unsignedLong") {
				return parseInt(text);
			}
			if (localName == "float" || localName == "double")
				return parseFloat(text);
			if (localName == "boolean")
				return text == 'true';
			return text;
		}
		var qname = "{" + uri + "}" + localName;
		var deserializer = cxfjsutils.interfaceObject.globalElementDeserializers[qname];
		if (deserializer != null) {
			return deserializer(cxfjsutils, element);
		}
	}
	return element;
}
//
// Definitions for schema: http://servicios.salud.aragon.es/
//  schema1.xsd
//
//
// Constructor for XML Schema item {http://servicios.salud.aragon.es/}personaBean
//
function servicios_salud_aragon_es__personaBean () {
    this.typeMarker = 'servicios_salud_aragon_es__personaBean';
    this._apellido = null;
    this._nombre = null;
    this._saludo = null;
}

//
// accessor is servicios_salud_aragon_es__personaBean.prototype.getApellido
// element get for apellido
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for apellido
// setter function is is servicios_salud_aragon_es__personaBean.prototype.setApellido
//
function servicios_salud_aragon_es__personaBean_getApellido() { return this._apellido;}

servicios_salud_aragon_es__personaBean.prototype.getApellido = servicios_salud_aragon_es__personaBean_getApellido;

function servicios_salud_aragon_es__personaBean_setApellido(value) { this._apellido = value;}

servicios_salud_aragon_es__personaBean.prototype.setApellido = servicios_salud_aragon_es__personaBean_setApellido;
//
// accessor is servicios_salud_aragon_es__personaBean.prototype.getNombre
// element get for nombre
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for nombre
// setter function is is servicios_salud_aragon_es__personaBean.prototype.setNombre
//
function servicios_salud_aragon_es__personaBean_getNombre() { return this._nombre;}

servicios_salud_aragon_es__personaBean.prototype.getNombre = servicios_salud_aragon_es__personaBean_getNombre;

function servicios_salud_aragon_es__personaBean_setNombre(value) { this._nombre = value;}

servicios_salud_aragon_es__personaBean.prototype.setNombre = servicios_salud_aragon_es__personaBean_setNombre;
//
// accessor is servicios_salud_aragon_es__personaBean.prototype.getSaludo
// element get for saludo
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for saludo
// setter function is is servicios_salud_aragon_es__personaBean.prototype.setSaludo
//
function servicios_salud_aragon_es__personaBean_getSaludo() { return this._saludo;}

servicios_salud_aragon_es__personaBean.prototype.getSaludo = servicios_salud_aragon_es__personaBean_getSaludo;

function servicios_salud_aragon_es__personaBean_setSaludo(value) { this._saludo = value;}

servicios_salud_aragon_es__personaBean.prototype.setSaludo = servicios_salud_aragon_es__personaBean_setSaludo;
//
// Serialize {http://servicios.salud.aragon.es/}personaBean
//
function servicios_salud_aragon_es__personaBean_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._apellido != null) {
      xml = xml + '<apellido>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._apellido);
      xml = xml + '</apellido>';
     }
    }
    // block for local variables
    {
     if (this._nombre != null) {
      xml = xml + '<nombre>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._nombre);
      xml = xml + '</nombre>';
     }
    }
    // block for local variables
    {
     if (this._saludo != null) {
      xml = xml + '<saludo>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._saludo);
      xml = xml + '</saludo>';
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

servicios_salud_aragon_es__personaBean.prototype.serialize = servicios_salud_aragon_es__personaBean_serialize;

function servicios_salud_aragon_es__personaBean_deserialize (cxfjsutils, element) {
    var newobject = new servicios_salud_aragon_es__personaBean();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing apellido');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'apellido')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setApellido(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing nombre');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'nombre')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setNombre(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing saludo');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'saludo')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setSaludo(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://servicios.salud.aragon.es/}saludarPersonasResponse
//
function servicios_salud_aragon_es__saludarPersonasResponse () {
    this.typeMarker = 'servicios_salud_aragon_es__saludarPersonasResponse';
    this._return = [];
}

//
// accessor is servicios_salud_aragon_es__saludarPersonasResponse.prototype.getReturn
// element get for return
// - element type is {http://servicios.salud.aragon.es/}personaBean
// - required element
// - array
//
// element set for return
// setter function is is servicios_salud_aragon_es__saludarPersonasResponse.prototype.setReturn
//
function servicios_salud_aragon_es__saludarPersonasResponse_getReturn() { return this._return;}

servicios_salud_aragon_es__saludarPersonasResponse.prototype.getReturn = servicios_salud_aragon_es__saludarPersonasResponse_getReturn;

function servicios_salud_aragon_es__saludarPersonasResponse_setReturn(value) { this._return = value;}

servicios_salud_aragon_es__saludarPersonasResponse.prototype.setReturn = servicios_salud_aragon_es__saludarPersonasResponse_setReturn;
//
// Serialize {http://servicios.salud.aragon.es/}saludarPersonasResponse
//
function servicios_salud_aragon_es__saludarPersonasResponse_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._return != null) {
      for (var ax = 0;ax < this._return.length;ax ++) {
       if (this._return[ax] == null) {
        xml = xml + '<return/>';
       } else {
        xml = xml + this._return[ax].serialize(cxfjsutils, 'return', null);
       }
      }
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

servicios_salud_aragon_es__saludarPersonasResponse.prototype.serialize = servicios_salud_aragon_es__saludarPersonasResponse_serialize;

function servicios_salud_aragon_es__saludarPersonasResponse_deserialize (cxfjsutils, element) {
    var newobject = new servicios_salud_aragon_es__saludarPersonasResponse();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing return');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'return')) {
     item = [];
     do  {
      var arrayItem = null;
      var value = null;
      if (!cxfjsutils.isElementNil(curElement)) {
       arrayItem = servicios_salud_aragon_es__personaBean_deserialize(cxfjsutils, curElement);
      }
      item.push(arrayItem);
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
       while(curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'return'));
     newobject.setReturn(item);
     var item = null;
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://servicios.salud.aragon.es/}validateToken
//
function servicios_salud_aragon_es__validateToken () {
    this.typeMarker = 'servicios_salud_aragon_es__validateToken';
    this._arg0 = null;
}

//
// accessor is servicios_salud_aragon_es__validateToken.prototype.getArg0
// element get for arg0
// - element type is {http://servicios.salud.aragon.es/}validateTokenIn
// - optional element
//
// element set for arg0
// setter function is is servicios_salud_aragon_es__validateToken.prototype.setArg0
//
function servicios_salud_aragon_es__validateToken_getArg0() { return this._arg0;}

servicios_salud_aragon_es__validateToken.prototype.getArg0 = servicios_salud_aragon_es__validateToken_getArg0;

function servicios_salud_aragon_es__validateToken_setArg0(value) { this._arg0 = value;}

servicios_salud_aragon_es__validateToken.prototype.setArg0 = servicios_salud_aragon_es__validateToken_setArg0;
//
// Serialize {http://servicios.salud.aragon.es/}validateToken
//
function servicios_salud_aragon_es__validateToken_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._arg0 != null) {
      xml = xml + this._arg0.serialize(cxfjsutils, 'arg0', null);
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

servicios_salud_aragon_es__validateToken.prototype.serialize = servicios_salud_aragon_es__validateToken_serialize;

function servicios_salud_aragon_es__validateToken_deserialize (cxfjsutils, element) {
    var newobject = new servicios_salud_aragon_es__validateToken();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing arg0');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'arg0')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      item = servicios_salud_aragon_es__validateTokenIn_deserialize(cxfjsutils, curElement);
     }
     newobject.setArg0(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://servicios.salud.aragon.es/}getTokenOut
//
function servicios_salud_aragon_es__getTokenOut () {
    this.typeMarker = 'servicios_salud_aragon_es__getTokenOut';
    this._appDst = null;
    this._appSrc = null;
    this._infoUserOut = null;
    this._mensaje = null;
    this._result = null;
    this._resultado = null;
}

//
// accessor is servicios_salud_aragon_es__getTokenOut.prototype.getAppDst
// element get for appDst
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for appDst
// setter function is is servicios_salud_aragon_es__getTokenOut.prototype.setAppDst
//
function servicios_salud_aragon_es__getTokenOut_getAppDst() { return this._appDst;}

servicios_salud_aragon_es__getTokenOut.prototype.getAppDst = servicios_salud_aragon_es__getTokenOut_getAppDst;

function servicios_salud_aragon_es__getTokenOut_setAppDst(value) { this._appDst = value;}

servicios_salud_aragon_es__getTokenOut.prototype.setAppDst = servicios_salud_aragon_es__getTokenOut_setAppDst;
//
// accessor is servicios_salud_aragon_es__getTokenOut.prototype.getAppSrc
// element get for appSrc
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for appSrc
// setter function is is servicios_salud_aragon_es__getTokenOut.prototype.setAppSrc
//
function servicios_salud_aragon_es__getTokenOut_getAppSrc() { return this._appSrc;}

servicios_salud_aragon_es__getTokenOut.prototype.getAppSrc = servicios_salud_aragon_es__getTokenOut_getAppSrc;

function servicios_salud_aragon_es__getTokenOut_setAppSrc(value) { this._appSrc = value;}

servicios_salud_aragon_es__getTokenOut.prototype.setAppSrc = servicios_salud_aragon_es__getTokenOut_setAppSrc;
//
// accessor is servicios_salud_aragon_es__getTokenOut.prototype.getInfoUserOut
// element get for infoUserOut
// - element type is {http://servicios.salud.aragon.es/}infoUserOut
// - optional element
//
// element set for infoUserOut
// setter function is is servicios_salud_aragon_es__getTokenOut.prototype.setInfoUserOut
//
function servicios_salud_aragon_es__getTokenOut_getInfoUserOut() { return this._infoUserOut;}

servicios_salud_aragon_es__getTokenOut.prototype.getInfoUserOut = servicios_salud_aragon_es__getTokenOut_getInfoUserOut;

function servicios_salud_aragon_es__getTokenOut_setInfoUserOut(value) { this._infoUserOut = value;}

servicios_salud_aragon_es__getTokenOut.prototype.setInfoUserOut = servicios_salud_aragon_es__getTokenOut_setInfoUserOut;
//
// accessor is servicios_salud_aragon_es__getTokenOut.prototype.getMensaje
// element get for mensaje
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for mensaje
// setter function is is servicios_salud_aragon_es__getTokenOut.prototype.setMensaje
//
function servicios_salud_aragon_es__getTokenOut_getMensaje() { return this._mensaje;}

servicios_salud_aragon_es__getTokenOut.prototype.getMensaje = servicios_salud_aragon_es__getTokenOut_getMensaje;

function servicios_salud_aragon_es__getTokenOut_setMensaje(value) { this._mensaje = value;}

servicios_salud_aragon_es__getTokenOut.prototype.setMensaje = servicios_salud_aragon_es__getTokenOut_setMensaje;
//
// accessor is servicios_salud_aragon_es__getTokenOut.prototype.getResult
// element get for result
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for result
// setter function is is servicios_salud_aragon_es__getTokenOut.prototype.setResult
//
function servicios_salud_aragon_es__getTokenOut_getResult() { return this._result;}

servicios_salud_aragon_es__getTokenOut.prototype.getResult = servicios_salud_aragon_es__getTokenOut_getResult;

function servicios_salud_aragon_es__getTokenOut_setResult(value) { this._result = value;}

servicios_salud_aragon_es__getTokenOut.prototype.setResult = servicios_salud_aragon_es__getTokenOut_setResult;
//
// accessor is servicios_salud_aragon_es__getTokenOut.prototype.getResultado
// element get for resultado
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for resultado
// setter function is is servicios_salud_aragon_es__getTokenOut.prototype.setResultado
//
function servicios_salud_aragon_es__getTokenOut_getResultado() { return this._resultado;}

servicios_salud_aragon_es__getTokenOut.prototype.getResultado = servicios_salud_aragon_es__getTokenOut_getResultado;

function servicios_salud_aragon_es__getTokenOut_setResultado(value) { this._resultado = value;}

servicios_salud_aragon_es__getTokenOut.prototype.setResultado = servicios_salud_aragon_es__getTokenOut_setResultado;
//
// Serialize {http://servicios.salud.aragon.es/}getTokenOut
//
function servicios_salud_aragon_es__getTokenOut_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._appDst != null) {
      xml = xml + '<appDst>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._appDst);
      xml = xml + '</appDst>';
     }
    }
    // block for local variables
    {
     if (this._appSrc != null) {
      xml = xml + '<appSrc>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._appSrc);
      xml = xml + '</appSrc>';
     }
    }
    // block for local variables
    {
     if (this._infoUserOut != null) {
      xml = xml + this._infoUserOut.serialize(cxfjsutils, 'infoUserOut', null);
     }
    }
    // block for local variables
    {
     if (this._mensaje != null) {
      xml = xml + '<mensaje>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._mensaje);
      xml = xml + '</mensaje>';
     }
    }
    // block for local variables
    {
     if (this._result != null) {
      xml = xml + '<result>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._result);
      xml = xml + '</result>';
     }
    }
    // block for local variables
    {
     if (this._resultado != null) {
      xml = xml + '<resultado>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._resultado);
      xml = xml + '</resultado>';
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

servicios_salud_aragon_es__getTokenOut.prototype.serialize = servicios_salud_aragon_es__getTokenOut_serialize;

function servicios_salud_aragon_es__getTokenOut_deserialize (cxfjsutils, element) {
    var newobject = new servicios_salud_aragon_es__getTokenOut();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing appDst');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'appDst')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setAppDst(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing appSrc');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'appSrc')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setAppSrc(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing infoUserOut');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'infoUserOut')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      item = servicios_salud_aragon_es__infoUserOut_deserialize(cxfjsutils, curElement);
     }
     newobject.setInfoUserOut(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing mensaje');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'mensaje')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setMensaje(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing result');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'result')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setResult(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing resultado');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'resultado')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setResultado(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://servicios.salud.aragon.es/}saludos
//
function servicios_salud_aragon_es__saludos () {
    this.typeMarker = 'servicios_salud_aragon_es__saludos';
    this._arg0 = [];
}

//
// accessor is servicios_salud_aragon_es__saludos.prototype.getArg0
// element get for arg0
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - array
//
// element set for arg0
// setter function is is servicios_salud_aragon_es__saludos.prototype.setArg0
//
function servicios_salud_aragon_es__saludos_getArg0() { return this._arg0;}

servicios_salud_aragon_es__saludos.prototype.getArg0 = servicios_salud_aragon_es__saludos_getArg0;

function servicios_salud_aragon_es__saludos_setArg0(value) { this._arg0 = value;}

servicios_salud_aragon_es__saludos.prototype.setArg0 = servicios_salud_aragon_es__saludos_setArg0;
//
// Serialize {http://servicios.salud.aragon.es/}saludos
//
function servicios_salud_aragon_es__saludos_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._arg0 != null) {
      for (var ax = 0;ax < this._arg0.length;ax ++) {
       if (this._arg0[ax] == null) {
        xml = xml + '<arg0/>';
       } else {
        xml = xml + '<arg0>';
        xml = xml + cxfjsutils.escapeXmlEntities(this._arg0[ax]);
        xml = xml + '</arg0>';
       }
      }
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

servicios_salud_aragon_es__saludos.prototype.serialize = servicios_salud_aragon_es__saludos_serialize;

function servicios_salud_aragon_es__saludos_deserialize (cxfjsutils, element) {
    var newobject = new servicios_salud_aragon_es__saludos();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing arg0');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'arg0')) {
     item = [];
     do  {
      var arrayItem = null;
      var value = null;
      if (!cxfjsutils.isElementNil(curElement)) {
       value = cxfjsutils.getNodeText(curElement);
       arrayItem = value;
      }
      item.push(arrayItem);
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
       while(curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'arg0'));
     newobject.setArg0(item);
     var item = null;
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://servicios.salud.aragon.es/}infoUserResponse
//
function servicios_salud_aragon_es__infoUserResponse () {
    this.typeMarker = 'servicios_salud_aragon_es__infoUserResponse';
    this._return = null;
}

//
// accessor is servicios_salud_aragon_es__infoUserResponse.prototype.getReturn
// element get for return
// - element type is {http://servicios.salud.aragon.es/}infoUserOut
// - optional element
//
// element set for return
// setter function is is servicios_salud_aragon_es__infoUserResponse.prototype.setReturn
//
function servicios_salud_aragon_es__infoUserResponse_getReturn() { return this._return;}

servicios_salud_aragon_es__infoUserResponse.prototype.getReturn = servicios_salud_aragon_es__infoUserResponse_getReturn;

function servicios_salud_aragon_es__infoUserResponse_setReturn(value) { this._return = value;}

servicios_salud_aragon_es__infoUserResponse.prototype.setReturn = servicios_salud_aragon_es__infoUserResponse_setReturn;
//
// Serialize {http://servicios.salud.aragon.es/}infoUserResponse
//
function servicios_salud_aragon_es__infoUserResponse_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._return != null) {
      xml = xml + this._return.serialize(cxfjsutils, 'return', null);
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

servicios_salud_aragon_es__infoUserResponse.prototype.serialize = servicios_salud_aragon_es__infoUserResponse_serialize;

function servicios_salud_aragon_es__infoUserResponse_deserialize (cxfjsutils, element) {
    var newobject = new servicios_salud_aragon_es__infoUserResponse();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing return');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'return')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      item = servicios_salud_aragon_es__infoUserOut_deserialize(cxfjsutils, curElement);
     }
     newobject.setReturn(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://servicios.salud.aragon.es/}getToken
//
function servicios_salud_aragon_es__getToken () {
    this.typeMarker = 'servicios_salud_aragon_es__getToken';
    this._arg0 = null;
}

//
// accessor is servicios_salud_aragon_es__getToken.prototype.getArg0
// element get for arg0
// - element type is {http://servicios.salud.aragon.es/}getTokenIn
// - optional element
//
// element set for arg0
// setter function is is servicios_salud_aragon_es__getToken.prototype.setArg0
//
function servicios_salud_aragon_es__getToken_getArg0() { return this._arg0;}

servicios_salud_aragon_es__getToken.prototype.getArg0 = servicios_salud_aragon_es__getToken_getArg0;

function servicios_salud_aragon_es__getToken_setArg0(value) { this._arg0 = value;}

servicios_salud_aragon_es__getToken.prototype.setArg0 = servicios_salud_aragon_es__getToken_setArg0;
//
// Serialize {http://servicios.salud.aragon.es/}getToken
//
function servicios_salud_aragon_es__getToken_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._arg0 != null) {
      xml = xml + this._arg0.serialize(cxfjsutils, 'arg0', null);
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

servicios_salud_aragon_es__getToken.prototype.serialize = servicios_salud_aragon_es__getToken_serialize;

function servicios_salud_aragon_es__getToken_deserialize (cxfjsutils, element) {
    var newobject = new servicios_salud_aragon_es__getToken();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing arg0');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'arg0')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      item = servicios_salud_aragon_es__getTokenIn_deserialize(cxfjsutils, curElement);
     }
     newobject.setArg0(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://servicios.salud.aragon.es/}validateTokenOut
//
function servicios_salud_aragon_es__validateTokenOut () {
    this.typeMarker = 'servicios_salud_aragon_es__validateTokenOut';
    this._appDst = null;
    this._appSrc = null;
    this._infoUserOut = null;
    this._mensaje = null;
    this._result = null;
    this._resultado = null;
}

//
// accessor is servicios_salud_aragon_es__validateTokenOut.prototype.getAppDst
// element get for appDst
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for appDst
// setter function is is servicios_salud_aragon_es__validateTokenOut.prototype.setAppDst
//
function servicios_salud_aragon_es__validateTokenOut_getAppDst() { return this._appDst;}

servicios_salud_aragon_es__validateTokenOut.prototype.getAppDst = servicios_salud_aragon_es__validateTokenOut_getAppDst;

function servicios_salud_aragon_es__validateTokenOut_setAppDst(value) { this._appDst = value;}

servicios_salud_aragon_es__validateTokenOut.prototype.setAppDst = servicios_salud_aragon_es__validateTokenOut_setAppDst;
//
// accessor is servicios_salud_aragon_es__validateTokenOut.prototype.getAppSrc
// element get for appSrc
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for appSrc
// setter function is is servicios_salud_aragon_es__validateTokenOut.prototype.setAppSrc
//
function servicios_salud_aragon_es__validateTokenOut_getAppSrc() { return this._appSrc;}

servicios_salud_aragon_es__validateTokenOut.prototype.getAppSrc = servicios_salud_aragon_es__validateTokenOut_getAppSrc;

function servicios_salud_aragon_es__validateTokenOut_setAppSrc(value) { this._appSrc = value;}

servicios_salud_aragon_es__validateTokenOut.prototype.setAppSrc = servicios_salud_aragon_es__validateTokenOut_setAppSrc;
//
// accessor is servicios_salud_aragon_es__validateTokenOut.prototype.getInfoUserOut
// element get for infoUserOut
// - element type is {http://servicios.salud.aragon.es/}infoUserOut
// - optional element
//
// element set for infoUserOut
// setter function is is servicios_salud_aragon_es__validateTokenOut.prototype.setInfoUserOut
//
function servicios_salud_aragon_es__validateTokenOut_getInfoUserOut() { return this._infoUserOut;}

servicios_salud_aragon_es__validateTokenOut.prototype.getInfoUserOut = servicios_salud_aragon_es__validateTokenOut_getInfoUserOut;

function servicios_salud_aragon_es__validateTokenOut_setInfoUserOut(value) { this._infoUserOut = value;}

servicios_salud_aragon_es__validateTokenOut.prototype.setInfoUserOut = servicios_salud_aragon_es__validateTokenOut_setInfoUserOut;
//
// accessor is servicios_salud_aragon_es__validateTokenOut.prototype.getMensaje
// element get for mensaje
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for mensaje
// setter function is is servicios_salud_aragon_es__validateTokenOut.prototype.setMensaje
//
function servicios_salud_aragon_es__validateTokenOut_getMensaje() { return this._mensaje;}

servicios_salud_aragon_es__validateTokenOut.prototype.getMensaje = servicios_salud_aragon_es__validateTokenOut_getMensaje;

function servicios_salud_aragon_es__validateTokenOut_setMensaje(value) { this._mensaje = value;}

servicios_salud_aragon_es__validateTokenOut.prototype.setMensaje = servicios_salud_aragon_es__validateTokenOut_setMensaje;
//
// accessor is servicios_salud_aragon_es__validateTokenOut.prototype.getResult
// element get for result
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for result
// setter function is is servicios_salud_aragon_es__validateTokenOut.prototype.setResult
//
function servicios_salud_aragon_es__validateTokenOut_getResult() { return this._result;}

servicios_salud_aragon_es__validateTokenOut.prototype.getResult = servicios_salud_aragon_es__validateTokenOut_getResult;

function servicios_salud_aragon_es__validateTokenOut_setResult(value) { this._result = value;}

servicios_salud_aragon_es__validateTokenOut.prototype.setResult = servicios_salud_aragon_es__validateTokenOut_setResult;
//
// accessor is servicios_salud_aragon_es__validateTokenOut.prototype.getResultado
// element get for resultado
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for resultado
// setter function is is servicios_salud_aragon_es__validateTokenOut.prototype.setResultado
//
function servicios_salud_aragon_es__validateTokenOut_getResultado() { return this._resultado;}

servicios_salud_aragon_es__validateTokenOut.prototype.getResultado = servicios_salud_aragon_es__validateTokenOut_getResultado;

function servicios_salud_aragon_es__validateTokenOut_setResultado(value) { this._resultado = value;}

servicios_salud_aragon_es__validateTokenOut.prototype.setResultado = servicios_salud_aragon_es__validateTokenOut_setResultado;
//
// Serialize {http://servicios.salud.aragon.es/}validateTokenOut
//
function servicios_salud_aragon_es__validateTokenOut_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._appDst != null) {
      xml = xml + '<appDst>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._appDst);
      xml = xml + '</appDst>';
     }
    }
    // block for local variables
    {
     if (this._appSrc != null) {
      xml = xml + '<appSrc>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._appSrc);
      xml = xml + '</appSrc>';
     }
    }
    // block for local variables
    {
     if (this._infoUserOut != null) {
      xml = xml + this._infoUserOut.serialize(cxfjsutils, 'infoUserOut', null);
     }
    }
    // block for local variables
    {
     if (this._mensaje != null) {
      xml = xml + '<mensaje>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._mensaje);
      xml = xml + '</mensaje>';
     }
    }
    // block for local variables
    {
     if (this._result != null) {
      xml = xml + '<result>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._result);
      xml = xml + '</result>';
     }
    }
    // block for local variables
    {
     if (this._resultado != null) {
      xml = xml + '<resultado>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._resultado);
      xml = xml + '</resultado>';
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

servicios_salud_aragon_es__validateTokenOut.prototype.serialize = servicios_salud_aragon_es__validateTokenOut_serialize;

function servicios_salud_aragon_es__validateTokenOut_deserialize (cxfjsutils, element) {
    var newobject = new servicios_salud_aragon_es__validateTokenOut();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing appDst');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'appDst')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setAppDst(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing appSrc');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'appSrc')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setAppSrc(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing infoUserOut');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'infoUserOut')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      item = servicios_salud_aragon_es__infoUserOut_deserialize(cxfjsutils, curElement);
     }
     newobject.setInfoUserOut(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing mensaje');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'mensaje')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setMensaje(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing result');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'result')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setResult(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing resultado');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'resultado')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setResultado(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://servicios.salud.aragon.es/}saludarPersonas
//
function servicios_salud_aragon_es__saludarPersonas () {
    this.typeMarker = 'servicios_salud_aragon_es__saludarPersonas';
    this._arg0 = [];
}

//
// accessor is servicios_salud_aragon_es__saludarPersonas.prototype.getArg0
// element get for arg0
// - element type is {http://servicios.salud.aragon.es/}personaBean
// - required element
// - array
//
// element set for arg0
// setter function is is servicios_salud_aragon_es__saludarPersonas.prototype.setArg0
//
function servicios_salud_aragon_es__saludarPersonas_getArg0() { return this._arg0;}

servicios_salud_aragon_es__saludarPersonas.prototype.getArg0 = servicios_salud_aragon_es__saludarPersonas_getArg0;

function servicios_salud_aragon_es__saludarPersonas_setArg0(value) { this._arg0 = value;}

servicios_salud_aragon_es__saludarPersonas.prototype.setArg0 = servicios_salud_aragon_es__saludarPersonas_setArg0;
//
// Serialize {http://servicios.salud.aragon.es/}saludarPersonas
//
function servicios_salud_aragon_es__saludarPersonas_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._arg0 != null) {
      for (var ax = 0;ax < this._arg0.length;ax ++) {
       if (this._arg0[ax] == null) {
        xml = xml + '<arg0/>';
       } else {
        xml = xml + this._arg0[ax].serialize(cxfjsutils, 'arg0', null);
       }
      }
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

servicios_salud_aragon_es__saludarPersonas.prototype.serialize = servicios_salud_aragon_es__saludarPersonas_serialize;

function servicios_salud_aragon_es__saludarPersonas_deserialize (cxfjsutils, element) {
    var newobject = new servicios_salud_aragon_es__saludarPersonas();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing arg0');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'arg0')) {
     item = [];
     do  {
      var arrayItem = null;
      var value = null;
      if (!cxfjsutils.isElementNil(curElement)) {
       arrayItem = servicios_salud_aragon_es__personaBean_deserialize(cxfjsutils, curElement);
      }
      item.push(arrayItem);
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
       while(curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'arg0'));
     newobject.setArg0(item);
     var item = null;
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://servicios.salud.aragon.es/}getTokenResponse
//
function servicios_salud_aragon_es__getTokenResponse () {
    this.typeMarker = 'servicios_salud_aragon_es__getTokenResponse';
    this._return = null;
}

//
// accessor is servicios_salud_aragon_es__getTokenResponse.prototype.getReturn
// element get for return
// - element type is {http://servicios.salud.aragon.es/}getTokenOut
// - optional element
//
// element set for return
// setter function is is servicios_salud_aragon_es__getTokenResponse.prototype.setReturn
//
function servicios_salud_aragon_es__getTokenResponse_getReturn() { return this._return;}

servicios_salud_aragon_es__getTokenResponse.prototype.getReturn = servicios_salud_aragon_es__getTokenResponse_getReturn;

function servicios_salud_aragon_es__getTokenResponse_setReturn(value) { this._return = value;}

servicios_salud_aragon_es__getTokenResponse.prototype.setReturn = servicios_salud_aragon_es__getTokenResponse_setReturn;
//
// Serialize {http://servicios.salud.aragon.es/}getTokenResponse
//
function servicios_salud_aragon_es__getTokenResponse_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._return != null) {
      xml = xml + this._return.serialize(cxfjsutils, 'return', null);
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

servicios_salud_aragon_es__getTokenResponse.prototype.serialize = servicios_salud_aragon_es__getTokenResponse_serialize;

function servicios_salud_aragon_es__getTokenResponse_deserialize (cxfjsutils, element) {
    var newobject = new servicios_salud_aragon_es__getTokenResponse();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing return');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'return')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      item = servicios_salud_aragon_es__getTokenOut_deserialize(cxfjsutils, curElement);
     }
     newobject.setReturn(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://servicios.salud.aragon.es/}saludosResponse
//
function servicios_salud_aragon_es__saludosResponse () {
    this.typeMarker = 'servicios_salud_aragon_es__saludosResponse';
    this._return = [];
}

//
// accessor is servicios_salud_aragon_es__saludosResponse.prototype.getReturn
// element get for return
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - array
//
// element set for return
// setter function is is servicios_salud_aragon_es__saludosResponse.prototype.setReturn
//
function servicios_salud_aragon_es__saludosResponse_getReturn() { return this._return;}

servicios_salud_aragon_es__saludosResponse.prototype.getReturn = servicios_salud_aragon_es__saludosResponse_getReturn;

function servicios_salud_aragon_es__saludosResponse_setReturn(value) { this._return = value;}

servicios_salud_aragon_es__saludosResponse.prototype.setReturn = servicios_salud_aragon_es__saludosResponse_setReturn;
//
// Serialize {http://servicios.salud.aragon.es/}saludosResponse
//
function servicios_salud_aragon_es__saludosResponse_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._return != null) {
      for (var ax = 0;ax < this._return.length;ax ++) {
       if (this._return[ax] == null) {
        xml = xml + '<return/>';
       } else {
        xml = xml + '<return>';
        xml = xml + cxfjsutils.escapeXmlEntities(this._return[ax]);
        xml = xml + '</return>';
       }
      }
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

servicios_salud_aragon_es__saludosResponse.prototype.serialize = servicios_salud_aragon_es__saludosResponse_serialize;

function servicios_salud_aragon_es__saludosResponse_deserialize (cxfjsutils, element) {
    var newobject = new servicios_salud_aragon_es__saludosResponse();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing return');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'return')) {
     item = [];
     do  {
      var arrayItem = null;
      var value = null;
      if (!cxfjsutils.isElementNil(curElement)) {
       value = cxfjsutils.getNodeText(curElement);
       arrayItem = value;
      }
      item.push(arrayItem);
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
       while(curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'return'));
     newobject.setReturn(item);
     var item = null;
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://servicios.salud.aragon.es/}saludar
//
function servicios_salud_aragon_es__saludar () {
    this.typeMarker = 'servicios_salud_aragon_es__saludar';
    this._arg0 = null;
}

//
// accessor is servicios_salud_aragon_es__saludar.prototype.getArg0
// element get for arg0
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for arg0
// setter function is is servicios_salud_aragon_es__saludar.prototype.setArg0
//
function servicios_salud_aragon_es__saludar_getArg0() { return this._arg0;}

servicios_salud_aragon_es__saludar.prototype.getArg0 = servicios_salud_aragon_es__saludar_getArg0;

function servicios_salud_aragon_es__saludar_setArg0(value) { this._arg0 = value;}

servicios_salud_aragon_es__saludar.prototype.setArg0 = servicios_salud_aragon_es__saludar_setArg0;
//
// Serialize {http://servicios.salud.aragon.es/}saludar
//
function servicios_salud_aragon_es__saludar_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._arg0 != null) {
      xml = xml + '<arg0>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._arg0);
      xml = xml + '</arg0>';
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

servicios_salud_aragon_es__saludar.prototype.serialize = servicios_salud_aragon_es__saludar_serialize;

function servicios_salud_aragon_es__saludar_deserialize (cxfjsutils, element) {
    var newobject = new servicios_salud_aragon_es__saludar();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing arg0');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'arg0')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setArg0(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://servicios.salud.aragon.es/}infoUserOut
//
function servicios_salud_aragon_es__infoUserOut () {
    this.typeMarker = 'servicios_salud_aragon_es__infoUserOut';
    this._cias = null;
    this._descCategoria = null;
    this._descCentro = null;
    this._descGfh = null;
    this._descSector = null;
    this._email = null;
    this._estado = null;
    this._estadoLDAP = null;
    this._gfhId = null;
    this._gruposLDAP = [];
    this._idCategoria = null;
    this._idCentro = null;
    this._idCentroMapaSanitario = null;
    this._idSector = null;
    this._login = null;
    this._nif = null;
    this._nombre = null;
    this._numeroColegiado = null;
    this._primerApellido = null;
    this._segundoApellido = null;
    this._telefono = null;
    this._ucsCarteraServicios = [];
}

//
// accessor is servicios_salud_aragon_es__infoUserOut.prototype.getCias
// element get for cias
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for cias
// setter function is is servicios_salud_aragon_es__infoUserOut.prototype.setCias
//
function servicios_salud_aragon_es__infoUserOut_getCias() { return this._cias;}

servicios_salud_aragon_es__infoUserOut.prototype.getCias = servicios_salud_aragon_es__infoUserOut_getCias;

function servicios_salud_aragon_es__infoUserOut_setCias(value) { this._cias = value;}

servicios_salud_aragon_es__infoUserOut.prototype.setCias = servicios_salud_aragon_es__infoUserOut_setCias;
//
// accessor is servicios_salud_aragon_es__infoUserOut.prototype.getDescCategoria
// element get for descCategoria
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for descCategoria
// setter function is is servicios_salud_aragon_es__infoUserOut.prototype.setDescCategoria
//
function servicios_salud_aragon_es__infoUserOut_getDescCategoria() { return this._descCategoria;}

servicios_salud_aragon_es__infoUserOut.prototype.getDescCategoria = servicios_salud_aragon_es__infoUserOut_getDescCategoria;

function servicios_salud_aragon_es__infoUserOut_setDescCategoria(value) { this._descCategoria = value;}

servicios_salud_aragon_es__infoUserOut.prototype.setDescCategoria = servicios_salud_aragon_es__infoUserOut_setDescCategoria;
//
// accessor is servicios_salud_aragon_es__infoUserOut.prototype.getDescCentro
// element get for descCentro
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for descCentro
// setter function is is servicios_salud_aragon_es__infoUserOut.prototype.setDescCentro
//
function servicios_salud_aragon_es__infoUserOut_getDescCentro() { return this._descCentro;}

servicios_salud_aragon_es__infoUserOut.prototype.getDescCentro = servicios_salud_aragon_es__infoUserOut_getDescCentro;

function servicios_salud_aragon_es__infoUserOut_setDescCentro(value) { this._descCentro = value;}

servicios_salud_aragon_es__infoUserOut.prototype.setDescCentro = servicios_salud_aragon_es__infoUserOut_setDescCentro;
//
// accessor is servicios_salud_aragon_es__infoUserOut.prototype.getDescGfh
// element get for descGfh
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for descGfh
// setter function is is servicios_salud_aragon_es__infoUserOut.prototype.setDescGfh
//
function servicios_salud_aragon_es__infoUserOut_getDescGfh() { return this._descGfh;}

servicios_salud_aragon_es__infoUserOut.prototype.getDescGfh = servicios_salud_aragon_es__infoUserOut_getDescGfh;

function servicios_salud_aragon_es__infoUserOut_setDescGfh(value) { this._descGfh = value;}

servicios_salud_aragon_es__infoUserOut.prototype.setDescGfh = servicios_salud_aragon_es__infoUserOut_setDescGfh;
//
// accessor is servicios_salud_aragon_es__infoUserOut.prototype.getDescSector
// element get for descSector
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for descSector
// setter function is is servicios_salud_aragon_es__infoUserOut.prototype.setDescSector
//
function servicios_salud_aragon_es__infoUserOut_getDescSector() { return this._descSector;}

servicios_salud_aragon_es__infoUserOut.prototype.getDescSector = servicios_salud_aragon_es__infoUserOut_getDescSector;

function servicios_salud_aragon_es__infoUserOut_setDescSector(value) { this._descSector = value;}

servicios_salud_aragon_es__infoUserOut.prototype.setDescSector = servicios_salud_aragon_es__infoUserOut_setDescSector;
//
// accessor is servicios_salud_aragon_es__infoUserOut.prototype.getEmail
// element get for email
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for email
// setter function is is servicios_salud_aragon_es__infoUserOut.prototype.setEmail
//
function servicios_salud_aragon_es__infoUserOut_getEmail() { return this._email;}

servicios_salud_aragon_es__infoUserOut.prototype.getEmail = servicios_salud_aragon_es__infoUserOut_getEmail;

function servicios_salud_aragon_es__infoUserOut_setEmail(value) { this._email = value;}

servicios_salud_aragon_es__infoUserOut.prototype.setEmail = servicios_salud_aragon_es__infoUserOut_setEmail;
//
// accessor is servicios_salud_aragon_es__infoUserOut.prototype.getEstado
// element get for estado
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for estado
// setter function is is servicios_salud_aragon_es__infoUserOut.prototype.setEstado
//
function servicios_salud_aragon_es__infoUserOut_getEstado() { return this._estado;}

servicios_salud_aragon_es__infoUserOut.prototype.getEstado = servicios_salud_aragon_es__infoUserOut_getEstado;

function servicios_salud_aragon_es__infoUserOut_setEstado(value) { this._estado = value;}

servicios_salud_aragon_es__infoUserOut.prototype.setEstado = servicios_salud_aragon_es__infoUserOut_setEstado;
//
// accessor is servicios_salud_aragon_es__infoUserOut.prototype.getEstadoLDAP
// element get for estadoLDAP
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for estadoLDAP
// setter function is is servicios_salud_aragon_es__infoUserOut.prototype.setEstadoLDAP
//
function servicios_salud_aragon_es__infoUserOut_getEstadoLDAP() { return this._estadoLDAP;}

servicios_salud_aragon_es__infoUserOut.prototype.getEstadoLDAP = servicios_salud_aragon_es__infoUserOut_getEstadoLDAP;

function servicios_salud_aragon_es__infoUserOut_setEstadoLDAP(value) { this._estadoLDAP = value;}

servicios_salud_aragon_es__infoUserOut.prototype.setEstadoLDAP = servicios_salud_aragon_es__infoUserOut_setEstadoLDAP;
//
// accessor is servicios_salud_aragon_es__infoUserOut.prototype.getGfhId
// element get for gfhId
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for gfhId
// setter function is is servicios_salud_aragon_es__infoUserOut.prototype.setGfhId
//
function servicios_salud_aragon_es__infoUserOut_getGfhId() { return this._gfhId;}

servicios_salud_aragon_es__infoUserOut.prototype.getGfhId = servicios_salud_aragon_es__infoUserOut_getGfhId;

function servicios_salud_aragon_es__infoUserOut_setGfhId(value) { this._gfhId = value;}

servicios_salud_aragon_es__infoUserOut.prototype.setGfhId = servicios_salud_aragon_es__infoUserOut_setGfhId;
//
// accessor is servicios_salud_aragon_es__infoUserOut.prototype.getGruposLDAP
// element get for gruposLDAP
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - array
// - nillable
//
// element set for gruposLDAP
// setter function is is servicios_salud_aragon_es__infoUserOut.prototype.setGruposLDAP
//
function servicios_salud_aragon_es__infoUserOut_getGruposLDAP() { return this._gruposLDAP;}

servicios_salud_aragon_es__infoUserOut.prototype.getGruposLDAP = servicios_salud_aragon_es__infoUserOut_getGruposLDAP;

function servicios_salud_aragon_es__infoUserOut_setGruposLDAP(value) { this._gruposLDAP = value;}

servicios_salud_aragon_es__infoUserOut.prototype.setGruposLDAP = servicios_salud_aragon_es__infoUserOut_setGruposLDAP;
//
// accessor is servicios_salud_aragon_es__infoUserOut.prototype.getIdCategoria
// element get for idCategoria
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for idCategoria
// setter function is is servicios_salud_aragon_es__infoUserOut.prototype.setIdCategoria
//
function servicios_salud_aragon_es__infoUserOut_getIdCategoria() { return this._idCategoria;}

servicios_salud_aragon_es__infoUserOut.prototype.getIdCategoria = servicios_salud_aragon_es__infoUserOut_getIdCategoria;

function servicios_salud_aragon_es__infoUserOut_setIdCategoria(value) { this._idCategoria = value;}

servicios_salud_aragon_es__infoUserOut.prototype.setIdCategoria = servicios_salud_aragon_es__infoUserOut_setIdCategoria;
//
// accessor is servicios_salud_aragon_es__infoUserOut.prototype.getIdCentro
// element get for idCentro
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for idCentro
// setter function is is servicios_salud_aragon_es__infoUserOut.prototype.setIdCentro
//
function servicios_salud_aragon_es__infoUserOut_getIdCentro() { return this._idCentro;}

servicios_salud_aragon_es__infoUserOut.prototype.getIdCentro = servicios_salud_aragon_es__infoUserOut_getIdCentro;

function servicios_salud_aragon_es__infoUserOut_setIdCentro(value) { this._idCentro = value;}

servicios_salud_aragon_es__infoUserOut.prototype.setIdCentro = servicios_salud_aragon_es__infoUserOut_setIdCentro;
//
// accessor is servicios_salud_aragon_es__infoUserOut.prototype.getIdCentroMapaSanitario
// element get for idCentroMapaSanitario
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for idCentroMapaSanitario
// setter function is is servicios_salud_aragon_es__infoUserOut.prototype.setIdCentroMapaSanitario
//
function servicios_salud_aragon_es__infoUserOut_getIdCentroMapaSanitario() { return this._idCentroMapaSanitario;}

servicios_salud_aragon_es__infoUserOut.prototype.getIdCentroMapaSanitario = servicios_salud_aragon_es__infoUserOut_getIdCentroMapaSanitario;

function servicios_salud_aragon_es__infoUserOut_setIdCentroMapaSanitario(value) { this._idCentroMapaSanitario = value;}

servicios_salud_aragon_es__infoUserOut.prototype.setIdCentroMapaSanitario = servicios_salud_aragon_es__infoUserOut_setIdCentroMapaSanitario;
//
// accessor is servicios_salud_aragon_es__infoUserOut.prototype.getIdSector
// element get for idSector
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for idSector
// setter function is is servicios_salud_aragon_es__infoUserOut.prototype.setIdSector
//
function servicios_salud_aragon_es__infoUserOut_getIdSector() { return this._idSector;}

servicios_salud_aragon_es__infoUserOut.prototype.getIdSector = servicios_salud_aragon_es__infoUserOut_getIdSector;

function servicios_salud_aragon_es__infoUserOut_setIdSector(value) { this._idSector = value;}

servicios_salud_aragon_es__infoUserOut.prototype.setIdSector = servicios_salud_aragon_es__infoUserOut_setIdSector;
//
// accessor is servicios_salud_aragon_es__infoUserOut.prototype.getLogin
// element get for login
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for login
// setter function is is servicios_salud_aragon_es__infoUserOut.prototype.setLogin
//
function servicios_salud_aragon_es__infoUserOut_getLogin() { return this._login;}

servicios_salud_aragon_es__infoUserOut.prototype.getLogin = servicios_salud_aragon_es__infoUserOut_getLogin;

function servicios_salud_aragon_es__infoUserOut_setLogin(value) { this._login = value;}

servicios_salud_aragon_es__infoUserOut.prototype.setLogin = servicios_salud_aragon_es__infoUserOut_setLogin;
//
// accessor is servicios_salud_aragon_es__infoUserOut.prototype.getNif
// element get for nif
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for nif
// setter function is is servicios_salud_aragon_es__infoUserOut.prototype.setNif
//
function servicios_salud_aragon_es__infoUserOut_getNif() { return this._nif;}

servicios_salud_aragon_es__infoUserOut.prototype.getNif = servicios_salud_aragon_es__infoUserOut_getNif;

function servicios_salud_aragon_es__infoUserOut_setNif(value) { this._nif = value;}

servicios_salud_aragon_es__infoUserOut.prototype.setNif = servicios_salud_aragon_es__infoUserOut_setNif;
//
// accessor is servicios_salud_aragon_es__infoUserOut.prototype.getNombre
// element get for nombre
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for nombre
// setter function is is servicios_salud_aragon_es__infoUserOut.prototype.setNombre
//
function servicios_salud_aragon_es__infoUserOut_getNombre() { return this._nombre;}

servicios_salud_aragon_es__infoUserOut.prototype.getNombre = servicios_salud_aragon_es__infoUserOut_getNombre;

function servicios_salud_aragon_es__infoUserOut_setNombre(value) { this._nombre = value;}

servicios_salud_aragon_es__infoUserOut.prototype.setNombre = servicios_salud_aragon_es__infoUserOut_setNombre;
//
// accessor is servicios_salud_aragon_es__infoUserOut.prototype.getNumeroColegiado
// element get for numeroColegiado
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for numeroColegiado
// setter function is is servicios_salud_aragon_es__infoUserOut.prototype.setNumeroColegiado
//
function servicios_salud_aragon_es__infoUserOut_getNumeroColegiado() { return this._numeroColegiado;}

servicios_salud_aragon_es__infoUserOut.prototype.getNumeroColegiado = servicios_salud_aragon_es__infoUserOut_getNumeroColegiado;

function servicios_salud_aragon_es__infoUserOut_setNumeroColegiado(value) { this._numeroColegiado = value;}

servicios_salud_aragon_es__infoUserOut.prototype.setNumeroColegiado = servicios_salud_aragon_es__infoUserOut_setNumeroColegiado;
//
// accessor is servicios_salud_aragon_es__infoUserOut.prototype.getPrimerApellido
// element get for primerApellido
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for primerApellido
// setter function is is servicios_salud_aragon_es__infoUserOut.prototype.setPrimerApellido
//
function servicios_salud_aragon_es__infoUserOut_getPrimerApellido() { return this._primerApellido;}

servicios_salud_aragon_es__infoUserOut.prototype.getPrimerApellido = servicios_salud_aragon_es__infoUserOut_getPrimerApellido;

function servicios_salud_aragon_es__infoUserOut_setPrimerApellido(value) { this._primerApellido = value;}

servicios_salud_aragon_es__infoUserOut.prototype.setPrimerApellido = servicios_salud_aragon_es__infoUserOut_setPrimerApellido;
//
// accessor is servicios_salud_aragon_es__infoUserOut.prototype.getSegundoApellido
// element get for segundoApellido
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for segundoApellido
// setter function is is servicios_salud_aragon_es__infoUserOut.prototype.setSegundoApellido
//
function servicios_salud_aragon_es__infoUserOut_getSegundoApellido() { return this._segundoApellido;}

servicios_salud_aragon_es__infoUserOut.prototype.getSegundoApellido = servicios_salud_aragon_es__infoUserOut_getSegundoApellido;

function servicios_salud_aragon_es__infoUserOut_setSegundoApellido(value) { this._segundoApellido = value;}

servicios_salud_aragon_es__infoUserOut.prototype.setSegundoApellido = servicios_salud_aragon_es__infoUserOut_setSegundoApellido;
//
// accessor is servicios_salud_aragon_es__infoUserOut.prototype.getTelefono
// element get for telefono
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for telefono
// setter function is is servicios_salud_aragon_es__infoUserOut.prototype.setTelefono
//
function servicios_salud_aragon_es__infoUserOut_getTelefono() { return this._telefono;}

servicios_salud_aragon_es__infoUserOut.prototype.getTelefono = servicios_salud_aragon_es__infoUserOut_getTelefono;

function servicios_salud_aragon_es__infoUserOut_setTelefono(value) { this._telefono = value;}

servicios_salud_aragon_es__infoUserOut.prototype.setTelefono = servicios_salud_aragon_es__infoUserOut_setTelefono;
//
// accessor is servicios_salud_aragon_es__infoUserOut.prototype.getUcsCarteraServicios
// element get for ucsCarteraServicios
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - required element
// - array
// - nillable
//
// element set for ucsCarteraServicios
// setter function is is servicios_salud_aragon_es__infoUserOut.prototype.setUcsCarteraServicios
//
function servicios_salud_aragon_es__infoUserOut_getUcsCarteraServicios() { return this._ucsCarteraServicios;}

servicios_salud_aragon_es__infoUserOut.prototype.getUcsCarteraServicios = servicios_salud_aragon_es__infoUserOut_getUcsCarteraServicios;

function servicios_salud_aragon_es__infoUserOut_setUcsCarteraServicios(value) { this._ucsCarteraServicios = value;}

servicios_salud_aragon_es__infoUserOut.prototype.setUcsCarteraServicios = servicios_salud_aragon_es__infoUserOut_setUcsCarteraServicios;
//
// Serialize {http://servicios.salud.aragon.es/}infoUserOut
//
function servicios_salud_aragon_es__infoUserOut_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._cias != null) {
      xml = xml + '<cias>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._cias);
      xml = xml + '</cias>';
     }
    }
    // block for local variables
    {
     if (this._descCategoria != null) {
      xml = xml + '<descCategoria>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._descCategoria);
      xml = xml + '</descCategoria>';
     }
    }
    // block for local variables
    {
     if (this._descCentro != null) {
      xml = xml + '<descCentro>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._descCentro);
      xml = xml + '</descCentro>';
     }
    }
    // block for local variables
    {
     if (this._descGfh != null) {
      xml = xml + '<descGfh>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._descGfh);
      xml = xml + '</descGfh>';
     }
    }
    // block for local variables
    {
     if (this._descSector != null) {
      xml = xml + '<descSector>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._descSector);
      xml = xml + '</descSector>';
     }
    }
    // block for local variables
    {
     if (this._email != null) {
      xml = xml + '<email>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._email);
      xml = xml + '</email>';
     }
    }
    // block for local variables
    {
     if (this._estado != null) {
      xml = xml + '<estado>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._estado);
      xml = xml + '</estado>';
     }
    }
    // block for local variables
    {
     if (this._estadoLDAP != null) {
      xml = xml + '<estadoLDAP>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._estadoLDAP);
      xml = xml + '</estadoLDAP>';
     }
    }
    // block for local variables
    {
     if (this._gfhId != null) {
      xml = xml + '<gfhId>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._gfhId);
      xml = xml + '</gfhId>';
     }
    }
    // block for local variables
    {
     if (this._gruposLDAP != null) {
      for (var ax = 0;ax < this._gruposLDAP.length;ax ++) {
       if (this._gruposLDAP[ax] == null) {
        xml = xml + '<gruposLDAP xsi:nil=\'true\'/>';
       } else {
        xml = xml + '<gruposLDAP>';
        xml = xml + cxfjsutils.escapeXmlEntities(this._gruposLDAP[ax]);
        xml = xml + '</gruposLDAP>';
       }
      }
     }
    }
    // block for local variables
    {
     if (this._idCategoria != null) {
      xml = xml + '<idCategoria>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._idCategoria);
      xml = xml + '</idCategoria>';
     }
    }
    // block for local variables
    {
     if (this._idCentro != null) {
      xml = xml + '<idCentro>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._idCentro);
      xml = xml + '</idCentro>';
     }
    }
    // block for local variables
    {
     if (this._idCentroMapaSanitario != null) {
      xml = xml + '<idCentroMapaSanitario>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._idCentroMapaSanitario);
      xml = xml + '</idCentroMapaSanitario>';
     }
    }
    // block for local variables
    {
     if (this._idSector != null) {
      xml = xml + '<idSector>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._idSector);
      xml = xml + '</idSector>';
     }
    }
    // block for local variables
    {
     if (this._login != null) {
      xml = xml + '<login>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._login);
      xml = xml + '</login>';
     }
    }
    // block for local variables
    {
     if (this._nif != null) {
      xml = xml + '<nif>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._nif);
      xml = xml + '</nif>';
     }
    }
    // block for local variables
    {
     if (this._nombre != null) {
      xml = xml + '<nombre>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._nombre);
      xml = xml + '</nombre>';
     }
    }
    // block for local variables
    {
     if (this._numeroColegiado != null) {
      xml = xml + '<numeroColegiado>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._numeroColegiado);
      xml = xml + '</numeroColegiado>';
     }
    }
    // block for local variables
    {
     if (this._primerApellido != null) {
      xml = xml + '<primerApellido>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._primerApellido);
      xml = xml + '</primerApellido>';
     }
    }
    // block for local variables
    {
     if (this._segundoApellido != null) {
      xml = xml + '<segundoApellido>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._segundoApellido);
      xml = xml + '</segundoApellido>';
     }
    }
    // block for local variables
    {
     if (this._telefono != null) {
      xml = xml + '<telefono>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._telefono);
      xml = xml + '</telefono>';
     }
    }
    // block for local variables
    {
     if (this._ucsCarteraServicios != null) {
      for (var ax = 0;ax < this._ucsCarteraServicios.length;ax ++) {
       if (this._ucsCarteraServicios[ax] == null) {
        xml = xml + '<ucsCarteraServicios xsi:nil=\'true\'/>';
       } else {
        xml = xml + '<ucsCarteraServicios>';
        xml = xml + cxfjsutils.escapeXmlEntities(this._ucsCarteraServicios[ax]);
        xml = xml + '</ucsCarteraServicios>';
       }
      }
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

servicios_salud_aragon_es__infoUserOut.prototype.serialize = servicios_salud_aragon_es__infoUserOut_serialize;

function servicios_salud_aragon_es__infoUserOut_deserialize (cxfjsutils, element) {
    var newobject = new servicios_salud_aragon_es__infoUserOut();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing cias');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'cias')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setCias(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing descCategoria');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'descCategoria')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setDescCategoria(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing descCentro');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'descCentro')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setDescCentro(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing descGfh');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'descGfh')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setDescGfh(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing descSector');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'descSector')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setDescSector(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing email');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'email')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setEmail(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing estado');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'estado')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setEstado(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing estadoLDAP');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'estadoLDAP')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setEstadoLDAP(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing gfhId');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'gfhId')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setGfhId(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing gruposLDAP');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'gruposLDAP')) {
     item = [];
     do  {
      var arrayItem = null;
      var value = null;
      if (!cxfjsutils.isElementNil(curElement)) {
       value = cxfjsutils.getNodeText(curElement);
       arrayItem = value;
      }
      item.push(arrayItem);
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
       while(curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'gruposLDAP'));
     newobject.setGruposLDAP(item);
     var item = null;
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing idCategoria');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'idCategoria')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setIdCategoria(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing idCentro');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'idCentro')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setIdCentro(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing idCentroMapaSanitario');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'idCentroMapaSanitario')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setIdCentroMapaSanitario(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing idSector');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'idSector')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setIdSector(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing login');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'login')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setLogin(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing nif');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'nif')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setNif(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing nombre');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'nombre')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setNombre(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing numeroColegiado');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'numeroColegiado')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setNumeroColegiado(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing primerApellido');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'primerApellido')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setPrimerApellido(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing segundoApellido');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'segundoApellido')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setSegundoApellido(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing telefono');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'telefono')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setTelefono(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing ucsCarteraServicios');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'ucsCarteraServicios')) {
     item = [];
     do  {
      var arrayItem = null;
      var value = null;
      if (!cxfjsutils.isElementNil(curElement)) {
       value = cxfjsutils.getNodeText(curElement);
       arrayItem = value;
      }
      item.push(arrayItem);
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
       while(curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'ucsCarteraServicios'));
     newobject.setUcsCarteraServicios(item);
     var item = null;
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://servicios.salud.aragon.es/}infoUserIn
//
function servicios_salud_aragon_es__infoUserIn () {
    this.typeMarker = 'servicios_salud_aragon_es__infoUserIn';
    this._dni = null;
    this._login = null;
}

//
// accessor is servicios_salud_aragon_es__infoUserIn.prototype.getDni
// element get for dni
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for dni
// setter function is is servicios_salud_aragon_es__infoUserIn.prototype.setDni
//
function servicios_salud_aragon_es__infoUserIn_getDni() { return this._dni;}

servicios_salud_aragon_es__infoUserIn.prototype.getDni = servicios_salud_aragon_es__infoUserIn_getDni;

function servicios_salud_aragon_es__infoUserIn_setDni(value) { this._dni = value;}

servicios_salud_aragon_es__infoUserIn.prototype.setDni = servicios_salud_aragon_es__infoUserIn_setDni;
//
// accessor is servicios_salud_aragon_es__infoUserIn.prototype.getLogin
// element get for login
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for login
// setter function is is servicios_salud_aragon_es__infoUserIn.prototype.setLogin
//
function servicios_salud_aragon_es__infoUserIn_getLogin() { return this._login;}

servicios_salud_aragon_es__infoUserIn.prototype.getLogin = servicios_salud_aragon_es__infoUserIn_getLogin;

function servicios_salud_aragon_es__infoUserIn_setLogin(value) { this._login = value;}

servicios_salud_aragon_es__infoUserIn.prototype.setLogin = servicios_salud_aragon_es__infoUserIn_setLogin;
//
// Serialize {http://servicios.salud.aragon.es/}infoUserIn
//
function servicios_salud_aragon_es__infoUserIn_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._dni != null) {
      xml = xml + '<dni>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._dni);
      xml = xml + '</dni>';
     }
    }
    // block for local variables
    {
     if (this._login != null) {
      xml = xml + '<login>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._login);
      xml = xml + '</login>';
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

servicios_salud_aragon_es__infoUserIn.prototype.serialize = servicios_salud_aragon_es__infoUserIn_serialize;

function servicios_salud_aragon_es__infoUserIn_deserialize (cxfjsutils, element) {
    var newobject = new servicios_salud_aragon_es__infoUserIn();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing dni');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'dni')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setDni(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing login');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'login')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setLogin(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://servicios.salud.aragon.es/}getTokenIn
//
function servicios_salud_aragon_es__getTokenIn () {
    this.typeMarker = 'servicios_salud_aragon_es__getTokenIn';
    this._appDst = null;
    this._appSrc = null;
    this._nif = null;
    this._sec = null;
    this._trustString = null;
    this._type = null;
}

//
// accessor is servicios_salud_aragon_es__getTokenIn.prototype.getAppDst
// element get for appDst
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for appDst
// setter function is is servicios_salud_aragon_es__getTokenIn.prototype.setAppDst
//
function servicios_salud_aragon_es__getTokenIn_getAppDst() { return this._appDst;}

servicios_salud_aragon_es__getTokenIn.prototype.getAppDst = servicios_salud_aragon_es__getTokenIn_getAppDst;

function servicios_salud_aragon_es__getTokenIn_setAppDst(value) { this._appDst = value;}

servicios_salud_aragon_es__getTokenIn.prototype.setAppDst = servicios_salud_aragon_es__getTokenIn_setAppDst;
//
// accessor is servicios_salud_aragon_es__getTokenIn.prototype.getAppSrc
// element get for appSrc
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for appSrc
// setter function is is servicios_salud_aragon_es__getTokenIn.prototype.setAppSrc
//
function servicios_salud_aragon_es__getTokenIn_getAppSrc() { return this._appSrc;}

servicios_salud_aragon_es__getTokenIn.prototype.getAppSrc = servicios_salud_aragon_es__getTokenIn_getAppSrc;

function servicios_salud_aragon_es__getTokenIn_setAppSrc(value) { this._appSrc = value;}

servicios_salud_aragon_es__getTokenIn.prototype.setAppSrc = servicios_salud_aragon_es__getTokenIn_setAppSrc;
//
// accessor is servicios_salud_aragon_es__getTokenIn.prototype.getNif
// element get for nif
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for nif
// setter function is is servicios_salud_aragon_es__getTokenIn.prototype.setNif
//
function servicios_salud_aragon_es__getTokenIn_getNif() { return this._nif;}

servicios_salud_aragon_es__getTokenIn.prototype.getNif = servicios_salud_aragon_es__getTokenIn_getNif;

function servicios_salud_aragon_es__getTokenIn_setNif(value) { this._nif = value;}

servicios_salud_aragon_es__getTokenIn.prototype.setNif = servicios_salud_aragon_es__getTokenIn_setNif;
//
// accessor is servicios_salud_aragon_es__getTokenIn.prototype.getSec
// element get for sec
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for sec
// setter function is is servicios_salud_aragon_es__getTokenIn.prototype.setSec
//
function servicios_salud_aragon_es__getTokenIn_getSec() { return this._sec;}

servicios_salud_aragon_es__getTokenIn.prototype.getSec = servicios_salud_aragon_es__getTokenIn_getSec;

function servicios_salud_aragon_es__getTokenIn_setSec(value) { this._sec = value;}

servicios_salud_aragon_es__getTokenIn.prototype.setSec = servicios_salud_aragon_es__getTokenIn_setSec;
//
// accessor is servicios_salud_aragon_es__getTokenIn.prototype.getTrustString
// element get for trustString
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for trustString
// setter function is is servicios_salud_aragon_es__getTokenIn.prototype.setTrustString
//
function servicios_salud_aragon_es__getTokenIn_getTrustString() { return this._trustString;}

servicios_salud_aragon_es__getTokenIn.prototype.getTrustString = servicios_salud_aragon_es__getTokenIn_getTrustString;

function servicios_salud_aragon_es__getTokenIn_setTrustString(value) { this._trustString = value;}

servicios_salud_aragon_es__getTokenIn.prototype.setTrustString = servicios_salud_aragon_es__getTokenIn_setTrustString;
//
// accessor is servicios_salud_aragon_es__getTokenIn.prototype.getType
// element get for type
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for type
// setter function is is servicios_salud_aragon_es__getTokenIn.prototype.setType
//
function servicios_salud_aragon_es__getTokenIn_getType() { return this._type;}

servicios_salud_aragon_es__getTokenIn.prototype.getType = servicios_salud_aragon_es__getTokenIn_getType;

function servicios_salud_aragon_es__getTokenIn_setType(value) { this._type = value;}

servicios_salud_aragon_es__getTokenIn.prototype.setType = servicios_salud_aragon_es__getTokenIn_setType;
//
// Serialize {http://servicios.salud.aragon.es/}getTokenIn
//
function servicios_salud_aragon_es__getTokenIn_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._appDst != null) {
      xml = xml + '<appDst>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._appDst);
      xml = xml + '</appDst>';
     }
    }
    // block for local variables
    {
     if (this._appSrc != null) {
      xml = xml + '<appSrc>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._appSrc);
      xml = xml + '</appSrc>';
     }
    }
    // block for local variables
    {
     if (this._nif != null) {
      xml = xml + '<nif>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._nif);
      xml = xml + '</nif>';
     }
    }
    // block for local variables
    {
     if (this._sec != null) {
      xml = xml + '<sec>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._sec);
      xml = xml + '</sec>';
     }
    }
    // block for local variables
    {
     if (this._trustString != null) {
      xml = xml + '<trustString>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._trustString);
      xml = xml + '</trustString>';
     }
    }
    // block for local variables
    {
     if (this._type != null) {
      xml = xml + '<type>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._type);
      xml = xml + '</type>';
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

servicios_salud_aragon_es__getTokenIn.prototype.serialize = servicios_salud_aragon_es__getTokenIn_serialize;

function servicios_salud_aragon_es__getTokenIn_deserialize (cxfjsutils, element) {
    var newobject = new servicios_salud_aragon_es__getTokenIn();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing appDst');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'appDst')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setAppDst(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing appSrc');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'appSrc')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setAppSrc(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing nif');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'nif')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setNif(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing sec');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'sec')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setSec(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing trustString');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'trustString')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setTrustString(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing type');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'type')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setType(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://servicios.salud.aragon.es/}infoUser
//
function servicios_salud_aragon_es__infoUser () {
    this.typeMarker = 'servicios_salud_aragon_es__infoUser';
    this._arg0 = null;
}

//
// accessor is servicios_salud_aragon_es__infoUser.prototype.getArg0
// element get for arg0
// - element type is {http://servicios.salud.aragon.es/}infoUserIn
// - optional element
//
// element set for arg0
// setter function is is servicios_salud_aragon_es__infoUser.prototype.setArg0
//
function servicios_salud_aragon_es__infoUser_getArg0() { return this._arg0;}

servicios_salud_aragon_es__infoUser.prototype.getArg0 = servicios_salud_aragon_es__infoUser_getArg0;

function servicios_salud_aragon_es__infoUser_setArg0(value) { this._arg0 = value;}

servicios_salud_aragon_es__infoUser.prototype.setArg0 = servicios_salud_aragon_es__infoUser_setArg0;
//
// Serialize {http://servicios.salud.aragon.es/}infoUser
//
function servicios_salud_aragon_es__infoUser_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._arg0 != null) {
      xml = xml + this._arg0.serialize(cxfjsutils, 'arg0', null);
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

servicios_salud_aragon_es__infoUser.prototype.serialize = servicios_salud_aragon_es__infoUser_serialize;

function servicios_salud_aragon_es__infoUser_deserialize (cxfjsutils, element) {
    var newobject = new servicios_salud_aragon_es__infoUser();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing arg0');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'arg0')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      item = servicios_salud_aragon_es__infoUserIn_deserialize(cxfjsutils, curElement);
     }
     newobject.setArg0(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://servicios.salud.aragon.es/}validateTokenResponse
//
function servicios_salud_aragon_es__validateTokenResponse () {
    this.typeMarker = 'servicios_salud_aragon_es__validateTokenResponse';
    this._return = null;
}

//
// accessor is servicios_salud_aragon_es__validateTokenResponse.prototype.getReturn
// element get for return
// - element type is {http://servicios.salud.aragon.es/}validateTokenOut
// - optional element
//
// element set for return
// setter function is is servicios_salud_aragon_es__validateTokenResponse.prototype.setReturn
//
function servicios_salud_aragon_es__validateTokenResponse_getReturn() { return this._return;}

servicios_salud_aragon_es__validateTokenResponse.prototype.getReturn = servicios_salud_aragon_es__validateTokenResponse_getReturn;

function servicios_salud_aragon_es__validateTokenResponse_setReturn(value) { this._return = value;}

servicios_salud_aragon_es__validateTokenResponse.prototype.setReturn = servicios_salud_aragon_es__validateTokenResponse_setReturn;
//
// Serialize {http://servicios.salud.aragon.es/}validateTokenResponse
//
function servicios_salud_aragon_es__validateTokenResponse_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._return != null) {
      xml = xml + this._return.serialize(cxfjsutils, 'return', null);
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

servicios_salud_aragon_es__validateTokenResponse.prototype.serialize = servicios_salud_aragon_es__validateTokenResponse_serialize;

function servicios_salud_aragon_es__validateTokenResponse_deserialize (cxfjsutils, element) {
    var newobject = new servicios_salud_aragon_es__validateTokenResponse();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing return');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'return')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      item = servicios_salud_aragon_es__validateTokenOut_deserialize(cxfjsutils, curElement);
     }
     newobject.setReturn(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://servicios.salud.aragon.es/}validateTokenIn
//
function servicios_salud_aragon_es__validateTokenIn () {
    this.typeMarker = 'servicios_salud_aragon_es__validateTokenIn';
    this._appDst = null;
    this._appSrc = null;
    this._token = null;
}

//
// accessor is servicios_salud_aragon_es__validateTokenIn.prototype.getAppDst
// element get for appDst
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for appDst
// setter function is is servicios_salud_aragon_es__validateTokenIn.prototype.setAppDst
//
function servicios_salud_aragon_es__validateTokenIn_getAppDst() { return this._appDst;}

servicios_salud_aragon_es__validateTokenIn.prototype.getAppDst = servicios_salud_aragon_es__validateTokenIn_getAppDst;

function servicios_salud_aragon_es__validateTokenIn_setAppDst(value) { this._appDst = value;}

servicios_salud_aragon_es__validateTokenIn.prototype.setAppDst = servicios_salud_aragon_es__validateTokenIn_setAppDst;
//
// accessor is servicios_salud_aragon_es__validateTokenIn.prototype.getAppSrc
// element get for appSrc
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for appSrc
// setter function is is servicios_salud_aragon_es__validateTokenIn.prototype.setAppSrc
//
function servicios_salud_aragon_es__validateTokenIn_getAppSrc() { return this._appSrc;}

servicios_salud_aragon_es__validateTokenIn.prototype.getAppSrc = servicios_salud_aragon_es__validateTokenIn_getAppSrc;

function servicios_salud_aragon_es__validateTokenIn_setAppSrc(value) { this._appSrc = value;}

servicios_salud_aragon_es__validateTokenIn.prototype.setAppSrc = servicios_salud_aragon_es__validateTokenIn_setAppSrc;
//
// accessor is servicios_salud_aragon_es__validateTokenIn.prototype.getToken
// element get for token
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for token
// setter function is is servicios_salud_aragon_es__validateTokenIn.prototype.setToken
//
function servicios_salud_aragon_es__validateTokenIn_getToken() { return this._token;}

servicios_salud_aragon_es__validateTokenIn.prototype.getToken = servicios_salud_aragon_es__validateTokenIn_getToken;

function servicios_salud_aragon_es__validateTokenIn_setToken(value) { this._token = value;}

servicios_salud_aragon_es__validateTokenIn.prototype.setToken = servicios_salud_aragon_es__validateTokenIn_setToken;
//
// Serialize {http://servicios.salud.aragon.es/}validateTokenIn
//
function servicios_salud_aragon_es__validateTokenIn_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._appDst != null) {
      xml = xml + '<appDst>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._appDst);
      xml = xml + '</appDst>';
     }
    }
    // block for local variables
    {
     if (this._appSrc != null) {
      xml = xml + '<appSrc>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._appSrc);
      xml = xml + '</appSrc>';
     }
    }
    // block for local variables
    {
     if (this._token != null) {
      xml = xml + '<token>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._token);
      xml = xml + '</token>';
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

servicios_salud_aragon_es__validateTokenIn.prototype.serialize = servicios_salud_aragon_es__validateTokenIn_serialize;

function servicios_salud_aragon_es__validateTokenIn_deserialize (cxfjsutils, element) {
    var newobject = new servicios_salud_aragon_es__validateTokenIn();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing appDst');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'appDst')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setAppDst(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing appSrc');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'appSrc')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setAppSrc(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing token');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'token')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setToken(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    return newobject;
}

//
// Constructor for XML Schema item {http://servicios.salud.aragon.es/}saludarResponse
//
function servicios_salud_aragon_es__saludarResponse () {
    this.typeMarker = 'servicios_salud_aragon_es__saludarResponse';
    this._return = null;
}

//
// accessor is servicios_salud_aragon_es__saludarResponse.prototype.getReturn
// element get for return
// - element type is {http://www.w3.org/2001/XMLSchema}string
// - optional element
//
// element set for return
// setter function is is servicios_salud_aragon_es__saludarResponse.prototype.setReturn
//
function servicios_salud_aragon_es__saludarResponse_getReturn() { return this._return;}

servicios_salud_aragon_es__saludarResponse.prototype.getReturn = servicios_salud_aragon_es__saludarResponse_getReturn;

function servicios_salud_aragon_es__saludarResponse_setReturn(value) { this._return = value;}

servicios_salud_aragon_es__saludarResponse.prototype.setReturn = servicios_salud_aragon_es__saludarResponse_setReturn;
//
// Serialize {http://servicios.salud.aragon.es/}saludarResponse
//
function servicios_salud_aragon_es__saludarResponse_serialize(cxfjsutils, elementName, extraNamespaces) {
    var xml = '';
    if (elementName != null) {
     xml = xml + '<';
     xml = xml + elementName;
     if (extraNamespaces) {
      xml = xml + ' ' + extraNamespaces;
     }
     xml = xml + '>';
    }
    // block for local variables
    {
     if (this._return != null) {
      xml = xml + '<return>';
      xml = xml + cxfjsutils.escapeXmlEntities(this._return);
      xml = xml + '</return>';
     }
    }
    if (elementName != null) {
     xml = xml + '</';
     xml = xml + elementName;
     xml = xml + '>';
    }
    return xml;
}

servicios_salud_aragon_es__saludarResponse.prototype.serialize = servicios_salud_aragon_es__saludarResponse_serialize;

function servicios_salud_aragon_es__saludarResponse_deserialize (cxfjsutils, element) {
    var newobject = new servicios_salud_aragon_es__saludarResponse();
    cxfjsutils.trace('element: ' + cxfjsutils.traceElementName(element));
    var curElement = cxfjsutils.getFirstElementChild(element);
    var item;
    cxfjsutils.trace('curElement: ' + cxfjsutils.traceElementName(curElement));
    cxfjsutils.trace('processing return');
    if (curElement != null && cxfjsutils.isNodeNamedNS(curElement, '', 'return')) {
     var value = null;
     if (!cxfjsutils.isElementNil(curElement)) {
      value = cxfjsutils.getNodeText(curElement);
      item = value;
     }
     newobject.setReturn(item);
     var item = null;
     if (curElement != null) {
      curElement = cxfjsutils.getNextElementSibling(curElement);
     }
    }
    return newobject;
}

//
// Definitions for service: {http://servicios.salud.aragon.es/}IServicioGuiaWSService
//

// Javascript for {http://servicios.salud.aragon.es/}IServicioGuiaWS

function servicios_salud_aragon_es__IServicioGuiaWS () {
    this.jsutils = new CxfApacheOrgUtil();
    this.jsutils.interfaceObject = this;
    this.synchronous = false;
    this.url = null;
    this.client = null;
    this.response = null;
    this.globalElementSerializers = [];
    this.globalElementDeserializers = [];
    this.globalElementSerializers['{http://servicios.salud.aragon.es/}saludosResponse'] = servicios_salud_aragon_es__saludosResponse_serialize;
    this.globalElementDeserializers['{http://servicios.salud.aragon.es/}saludosResponse'] = servicios_salud_aragon_es__saludosResponse_deserialize;
    this.globalElementSerializers['{http://servicios.salud.aragon.es/}saludar'] = servicios_salud_aragon_es__saludar_serialize;
    this.globalElementDeserializers['{http://servicios.salud.aragon.es/}saludar'] = servicios_salud_aragon_es__saludar_deserialize;
    this.globalElementSerializers['{http://servicios.salud.aragon.es/}validateToken'] = servicios_salud_aragon_es__validateToken_serialize;
    this.globalElementDeserializers['{http://servicios.salud.aragon.es/}validateToken'] = servicios_salud_aragon_es__validateToken_deserialize;
    this.globalElementSerializers['{http://servicios.salud.aragon.es/}saludarPersonasResponse'] = servicios_salud_aragon_es__saludarPersonasResponse_serialize;
    this.globalElementDeserializers['{http://servicios.salud.aragon.es/}saludarPersonasResponse'] = servicios_salud_aragon_es__saludarPersonasResponse_deserialize;
    this.globalElementSerializers['{http://servicios.salud.aragon.es/}saludos'] = servicios_salud_aragon_es__saludos_serialize;
    this.globalElementDeserializers['{http://servicios.salud.aragon.es/}saludos'] = servicios_salud_aragon_es__saludos_deserialize;
    this.globalElementSerializers['{http://servicios.salud.aragon.es/}infoUserResponse'] = servicios_salud_aragon_es__infoUserResponse_serialize;
    this.globalElementDeserializers['{http://servicios.salud.aragon.es/}infoUserResponse'] = servicios_salud_aragon_es__infoUserResponse_deserialize;
    this.globalElementSerializers['{http://servicios.salud.aragon.es/}infoUser'] = servicios_salud_aragon_es__infoUser_serialize;
    this.globalElementDeserializers['{http://servicios.salud.aragon.es/}infoUser'] = servicios_salud_aragon_es__infoUser_deserialize;
    this.globalElementSerializers['{http://servicios.salud.aragon.es/}getToken'] = servicios_salud_aragon_es__getToken_serialize;
    this.globalElementDeserializers['{http://servicios.salud.aragon.es/}getToken'] = servicios_salud_aragon_es__getToken_deserialize;
    this.globalElementSerializers['{http://servicios.salud.aragon.es/}validateTokenResponse'] = servicios_salud_aragon_es__validateTokenResponse_serialize;
    this.globalElementDeserializers['{http://servicios.salud.aragon.es/}validateTokenResponse'] = servicios_salud_aragon_es__validateTokenResponse_deserialize;
    this.globalElementSerializers['{http://servicios.salud.aragon.es/}saludarResponse'] = servicios_salud_aragon_es__saludarResponse_serialize;
    this.globalElementDeserializers['{http://servicios.salud.aragon.es/}saludarResponse'] = servicios_salud_aragon_es__saludarResponse_deserialize;
    this.globalElementSerializers['{http://servicios.salud.aragon.es/}saludarPersonas'] = servicios_salud_aragon_es__saludarPersonas_serialize;
    this.globalElementDeserializers['{http://servicios.salud.aragon.es/}saludarPersonas'] = servicios_salud_aragon_es__saludarPersonas_deserialize;
    this.globalElementSerializers['{http://servicios.salud.aragon.es/}getTokenResponse'] = servicios_salud_aragon_es__getTokenResponse_serialize;
    this.globalElementDeserializers['{http://servicios.salud.aragon.es/}getTokenResponse'] = servicios_salud_aragon_es__getTokenResponse_deserialize;
    this.globalElementSerializers['{http://servicios.salud.aragon.es/}personaBean'] = servicios_salud_aragon_es__personaBean_serialize;
    this.globalElementDeserializers['{http://servicios.salud.aragon.es/}personaBean'] = servicios_salud_aragon_es__personaBean_deserialize;
    this.globalElementSerializers['{http://servicios.salud.aragon.es/}saludarPersonasResponse'] = servicios_salud_aragon_es__saludarPersonasResponse_serialize;
    this.globalElementDeserializers['{http://servicios.salud.aragon.es/}saludarPersonasResponse'] = servicios_salud_aragon_es__saludarPersonasResponse_deserialize;
    this.globalElementSerializers['{http://servicios.salud.aragon.es/}validateToken'] = servicios_salud_aragon_es__validateToken_serialize;
    this.globalElementDeserializers['{http://servicios.salud.aragon.es/}validateToken'] = servicios_salud_aragon_es__validateToken_deserialize;
    this.globalElementSerializers['{http://servicios.salud.aragon.es/}getTokenOut'] = servicios_salud_aragon_es__getTokenOut_serialize;
    this.globalElementDeserializers['{http://servicios.salud.aragon.es/}getTokenOut'] = servicios_salud_aragon_es__getTokenOut_deserialize;
    this.globalElementSerializers['{http://servicios.salud.aragon.es/}saludos'] = servicios_salud_aragon_es__saludos_serialize;
    this.globalElementDeserializers['{http://servicios.salud.aragon.es/}saludos'] = servicios_salud_aragon_es__saludos_deserialize;
    this.globalElementSerializers['{http://servicios.salud.aragon.es/}infoUserResponse'] = servicios_salud_aragon_es__infoUserResponse_serialize;
    this.globalElementDeserializers['{http://servicios.salud.aragon.es/}infoUserResponse'] = servicios_salud_aragon_es__infoUserResponse_deserialize;
    this.globalElementSerializers['{http://servicios.salud.aragon.es/}getToken'] = servicios_salud_aragon_es__getToken_serialize;
    this.globalElementDeserializers['{http://servicios.salud.aragon.es/}getToken'] = servicios_salud_aragon_es__getToken_deserialize;
    this.globalElementSerializers['{http://servicios.salud.aragon.es/}validateTokenOut'] = servicios_salud_aragon_es__validateTokenOut_serialize;
    this.globalElementDeserializers['{http://servicios.salud.aragon.es/}validateTokenOut'] = servicios_salud_aragon_es__validateTokenOut_deserialize;
    this.globalElementSerializers['{http://servicios.salud.aragon.es/}saludarPersonas'] = servicios_salud_aragon_es__saludarPersonas_serialize;
    this.globalElementDeserializers['{http://servicios.salud.aragon.es/}saludarPersonas'] = servicios_salud_aragon_es__saludarPersonas_deserialize;
    this.globalElementSerializers['{http://servicios.salud.aragon.es/}getTokenResponse'] = servicios_salud_aragon_es__getTokenResponse_serialize;
    this.globalElementDeserializers['{http://servicios.salud.aragon.es/}getTokenResponse'] = servicios_salud_aragon_es__getTokenResponse_deserialize;
    this.globalElementSerializers['{http://servicios.salud.aragon.es/}saludosResponse'] = servicios_salud_aragon_es__saludosResponse_serialize;
    this.globalElementDeserializers['{http://servicios.salud.aragon.es/}saludosResponse'] = servicios_salud_aragon_es__saludosResponse_deserialize;
    this.globalElementSerializers['{http://servicios.salud.aragon.es/}saludar'] = servicios_salud_aragon_es__saludar_serialize;
    this.globalElementDeserializers['{http://servicios.salud.aragon.es/}saludar'] = servicios_salud_aragon_es__saludar_deserialize;
    this.globalElementSerializers['{http://servicios.salud.aragon.es/}infoUserOut'] = servicios_salud_aragon_es__infoUserOut_serialize;
    this.globalElementDeserializers['{http://servicios.salud.aragon.es/}infoUserOut'] = servicios_salud_aragon_es__infoUserOut_deserialize;
    this.globalElementSerializers['{http://servicios.salud.aragon.es/}infoUserIn'] = servicios_salud_aragon_es__infoUserIn_serialize;
    this.globalElementDeserializers['{http://servicios.salud.aragon.es/}infoUserIn'] = servicios_salud_aragon_es__infoUserIn_deserialize;
    this.globalElementSerializers['{http://servicios.salud.aragon.es/}getTokenIn'] = servicios_salud_aragon_es__getTokenIn_serialize;
    this.globalElementDeserializers['{http://servicios.salud.aragon.es/}getTokenIn'] = servicios_salud_aragon_es__getTokenIn_deserialize;
    this.globalElementSerializers['{http://servicios.salud.aragon.es/}infoUser'] = servicios_salud_aragon_es__infoUser_serialize;
    this.globalElementDeserializers['{http://servicios.salud.aragon.es/}infoUser'] = servicios_salud_aragon_es__infoUser_deserialize;
    this.globalElementSerializers['{http://servicios.salud.aragon.es/}validateTokenResponse'] = servicios_salud_aragon_es__validateTokenResponse_serialize;
    this.globalElementDeserializers['{http://servicios.salud.aragon.es/}validateTokenResponse'] = servicios_salud_aragon_es__validateTokenResponse_deserialize;
    this.globalElementSerializers['{http://servicios.salud.aragon.es/}validateTokenIn'] = servicios_salud_aragon_es__validateTokenIn_serialize;
    this.globalElementDeserializers['{http://servicios.salud.aragon.es/}validateTokenIn'] = servicios_salud_aragon_es__validateTokenIn_deserialize;
    this.globalElementSerializers['{http://servicios.salud.aragon.es/}saludarResponse'] = servicios_salud_aragon_es__saludarResponse_serialize;
    this.globalElementDeserializers['{http://servicios.salud.aragon.es/}saludarResponse'] = servicios_salud_aragon_es__saludarResponse_deserialize;
}

function servicios_salud_aragon_es__validateToken_op_onsuccess(client, responseXml) {
    if (client.user_onsuccess) {
     var responseObject = null;
     var element = responseXml.documentElement;
     this.jsutils.trace('responseXml: ' + this.jsutils.traceElementName(element));
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('first element child: ' + this.jsutils.traceElementName(element));
     while (!this.jsutils.isNodeNamedNS(element, 'http://schemas.xmlsoap.org/soap/envelope/', 'Body')) {
      element = this.jsutils.getNextElementSibling(element);
      if (element == null) {
       throw 'No env:Body in message.'
      }
     }
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('part element: ' + this.jsutils.traceElementName(element));
     this.jsutils.trace('calling servicios_salud_aragon_es__validateTokenResponse_deserializeResponse');
     responseObject = servicios_salud_aragon_es__validateTokenResponse_deserializeResponse(this.jsutils, element);
     client.user_onsuccess(responseObject);
    }
}

servicios_salud_aragon_es__IServicioGuiaWS.prototype.validateToken_onsuccess = servicios_salud_aragon_es__validateToken_op_onsuccess;

function servicios_salud_aragon_es__validateToken_op_onerror(client) {
    if (client.user_onerror) {
     var httpStatus;
     var httpStatusText;
     try {
      httpStatus = client.req.status;
      httpStatusText = client.req.statusText;
     } catch(e) {
      httpStatus = -1;
      httpStatusText = 'Error opening connection to server';
     }
     client.user_onerror(httpStatus, httpStatusText);
    }
}

servicios_salud_aragon_es__IServicioGuiaWS.prototype.validateToken_onerror = servicios_salud_aragon_es__validateToken_op_onerror;

//
// Operation {http://servicios.salud.aragon.es/}validateToken
// Wrapped operation.
// parameter arg0
// - Object constructor is servicios_salud_aragon_es__validateTokenIn
//
function servicios_salud_aragon_es__validateToken_op(successCallback, errorCallback, arg0) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(1);
    args[0] = arg0;
    xml = this.validateToken_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.validateToken_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.validateToken_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

servicios_salud_aragon_es__IServicioGuiaWS.prototype.validateToken = servicios_salud_aragon_es__validateToken_op;

function servicios_salud_aragon_es__validateToken_serializeInput(cxfjsutils, args) {
    var wrapperObj = new servicios_salud_aragon_es__validateToken();
    wrapperObj.setArg0(args[0]);
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://servicios.salud.aragon.es/' ");
    // block for local variables
    {
     xml = xml + wrapperObj.serialize(cxfjsutils, 'jns0:validateToken', null);
    }
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

servicios_salud_aragon_es__IServicioGuiaWS.prototype.validateToken_serializeInput = servicios_salud_aragon_es__validateToken_serializeInput;

function servicios_salud_aragon_es__validateTokenResponse_deserializeResponse(cxfjsutils, partElement) {
    var returnObject = servicios_salud_aragon_es__validateTokenResponse_deserialize (cxfjsutils, partElement);

    return returnObject;
}
function servicios_salud_aragon_es__saludos_op_onsuccess(client, responseXml) {
    if (client.user_onsuccess) {
     var responseObject = null;
     var element = responseXml.documentElement;
     this.jsutils.trace('responseXml: ' + this.jsutils.traceElementName(element));
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('first element child: ' + this.jsutils.traceElementName(element));
     while (!this.jsutils.isNodeNamedNS(element, 'http://schemas.xmlsoap.org/soap/envelope/', 'Body')) {
      element = this.jsutils.getNextElementSibling(element);
      if (element == null) {
       throw 'No env:Body in message.'
      }
     }
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('part element: ' + this.jsutils.traceElementName(element));
     this.jsutils.trace('calling servicios_salud_aragon_es__saludosResponse_deserializeResponse');
     responseObject = servicios_salud_aragon_es__saludosResponse_deserializeResponse(this.jsutils, element);
     client.user_onsuccess(responseObject);
    }
}

servicios_salud_aragon_es__IServicioGuiaWS.prototype.saludos_onsuccess = servicios_salud_aragon_es__saludos_op_onsuccess;

function servicios_salud_aragon_es__saludos_op_onerror(client) {
    if (client.user_onerror) {
     var httpStatus;
     var httpStatusText;
     try {
      httpStatus = client.req.status;
      httpStatusText = client.req.statusText;
     } catch(e) {
      httpStatus = -1;
      httpStatusText = 'Error opening connection to server';
     }
     client.user_onerror(httpStatus, httpStatusText);
    }
}

servicios_salud_aragon_es__IServicioGuiaWS.prototype.saludos_onerror = servicios_salud_aragon_es__saludos_op_onerror;

//
// Operation {http://servicios.salud.aragon.es/}saludos
// Wrapped operation.
// parameter arg0
// - array
// - simple type {http://www.w3.org/2001/XMLSchema}string//
function servicios_salud_aragon_es__saludos_op(successCallback, errorCallback, arg0) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(1);
    args[0] = arg0;
    xml = this.saludos_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.saludos_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.saludos_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

servicios_salud_aragon_es__IServicioGuiaWS.prototype.saludos = servicios_salud_aragon_es__saludos_op;

function servicios_salud_aragon_es__saludos_serializeInput(cxfjsutils, args) {
    var wrapperObj = new servicios_salud_aragon_es__saludos();
    wrapperObj.setArg0(args[0]);
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://servicios.salud.aragon.es/' ");
    // block for local variables
    {
     xml = xml + wrapperObj.serialize(cxfjsutils, 'jns0:saludos', null);
    }
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

servicios_salud_aragon_es__IServicioGuiaWS.prototype.saludos_serializeInput = servicios_salud_aragon_es__saludos_serializeInput;

function servicios_salud_aragon_es__saludosResponse_deserializeResponse(cxfjsutils, partElement) {
    var returnObject = servicios_salud_aragon_es__saludosResponse_deserialize (cxfjsutils, partElement);

    return returnObject;
}
function servicios_salud_aragon_es__getToken_op_onsuccess(client, responseXml) {
    if (client.user_onsuccess) {
     var responseObject = null;
     var element = responseXml.documentElement;
     this.jsutils.trace('responseXml: ' + this.jsutils.traceElementName(element));
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('first element child: ' + this.jsutils.traceElementName(element));
     while (!this.jsutils.isNodeNamedNS(element, 'http://schemas.xmlsoap.org/soap/envelope/', 'Body')) {
      element = this.jsutils.getNextElementSibling(element);
      if (element == null) {
       throw 'No env:Body in message.'
      }
     }
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('part element: ' + this.jsutils.traceElementName(element));
     this.jsutils.trace('calling servicios_salud_aragon_es__getTokenResponse_deserializeResponse');
     responseObject = servicios_salud_aragon_es__getTokenResponse_deserializeResponse(this.jsutils, element);
     client.user_onsuccess(responseObject);
    }
}

servicios_salud_aragon_es__IServicioGuiaWS.prototype.getToken_onsuccess = servicios_salud_aragon_es__getToken_op_onsuccess;

function servicios_salud_aragon_es__getToken_op_onerror(client) {
    if (client.user_onerror) {
     var httpStatus;
     var httpStatusText;
     try {
      httpStatus = client.req.status;
      httpStatusText = client.req.statusText;
     } catch(e) {
      httpStatus = -1;
      httpStatusText = 'Error opening connection to server';
     }
     client.user_onerror(httpStatus, httpStatusText);
    }
}

servicios_salud_aragon_es__IServicioGuiaWS.prototype.getToken_onerror = servicios_salud_aragon_es__getToken_op_onerror;

//
// Operation {http://servicios.salud.aragon.es/}getToken
// Wrapped operation.
// parameter arg0
// - Object constructor is servicios_salud_aragon_es__getTokenIn
//
function servicios_salud_aragon_es__getToken_op(successCallback, errorCallback, arg0) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(1);
    args[0] = arg0;
    xml = this.getToken_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.getToken_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.getToken_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

servicios_salud_aragon_es__IServicioGuiaWS.prototype.getToken = servicios_salud_aragon_es__getToken_op;

function servicios_salud_aragon_es__getToken_serializeInput(cxfjsutils, args) {
    var wrapperObj = new servicios_salud_aragon_es__getToken();
    wrapperObj.setArg0(args[0]);
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://servicios.salud.aragon.es/' ");
    // block for local variables
    {
     xml = xml + wrapperObj.serialize(cxfjsutils, 'jns0:getToken', null);
    }
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

servicios_salud_aragon_es__IServicioGuiaWS.prototype.getToken_serializeInput = servicios_salud_aragon_es__getToken_serializeInput;

function servicios_salud_aragon_es__getTokenResponse_deserializeResponse(cxfjsutils, partElement) {
    var returnObject = servicios_salud_aragon_es__getTokenResponse_deserialize (cxfjsutils, partElement);

    return returnObject;
}
function servicios_salud_aragon_es__infoUser_op_onsuccess(client, responseXml) {
    if (client.user_onsuccess) {
     var responseObject = null;
     var element = responseXml.documentElement;
     this.jsutils.trace('responseXml: ' + this.jsutils.traceElementName(element));
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('first element child: ' + this.jsutils.traceElementName(element));
     while (!this.jsutils.isNodeNamedNS(element, 'http://schemas.xmlsoap.org/soap/envelope/', 'Body')) {
      element = this.jsutils.getNextElementSibling(element);
      if (element == null) {
       throw 'No env:Body in message.'
      }
     }
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('part element: ' + this.jsutils.traceElementName(element));
     this.jsutils.trace('calling servicios_salud_aragon_es__infoUserResponse_deserializeResponse');
     responseObject = servicios_salud_aragon_es__infoUserResponse_deserializeResponse(this.jsutils, element);
     client.user_onsuccess(responseObject);
    }
}

servicios_salud_aragon_es__IServicioGuiaWS.prototype.infoUser_onsuccess = servicios_salud_aragon_es__infoUser_op_onsuccess;

function servicios_salud_aragon_es__infoUser_op_onerror(client) {
    if (client.user_onerror) {
     var httpStatus;
     var httpStatusText;
     try {
      httpStatus = client.req.status;
      httpStatusText = client.req.statusText;
     } catch(e) {
      httpStatus = -1;
      httpStatusText = 'Error opening connection to server';
     }
     client.user_onerror(httpStatus, httpStatusText);
    }
}

servicios_salud_aragon_es__IServicioGuiaWS.prototype.infoUser_onerror = servicios_salud_aragon_es__infoUser_op_onerror;

//
// Operation {http://servicios.salud.aragon.es/}infoUser
// Wrapped operation.
// parameter arg0
// - Object constructor is servicios_salud_aragon_es__infoUserIn
//
function servicios_salud_aragon_es__infoUser_op(successCallback, errorCallback, arg0) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(1);
    args[0] = arg0;
    xml = this.infoUser_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.infoUser_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.infoUser_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

servicios_salud_aragon_es__IServicioGuiaWS.prototype.infoUser = servicios_salud_aragon_es__infoUser_op;

function servicios_salud_aragon_es__infoUser_serializeInput(cxfjsutils, args) {
    var wrapperObj = new servicios_salud_aragon_es__infoUser();
    wrapperObj.setArg0(args[0]);
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://servicios.salud.aragon.es/' ");
    // block for local variables
    {
     xml = xml + wrapperObj.serialize(cxfjsutils, 'jns0:infoUser', null);
    }
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

servicios_salud_aragon_es__IServicioGuiaWS.prototype.infoUser_serializeInput = servicios_salud_aragon_es__infoUser_serializeInput;

function servicios_salud_aragon_es__infoUserResponse_deserializeResponse(cxfjsutils, partElement) {
    var returnObject = servicios_salud_aragon_es__infoUserResponse_deserialize (cxfjsutils, partElement);

    return returnObject;
}
function servicios_salud_aragon_es__saludar_op_onsuccess(client, responseXml) {
    if (client.user_onsuccess) {
     var responseObject = null;
     var element = responseXml.documentElement;
     this.jsutils.trace('responseXml: ' + this.jsutils.traceElementName(element));
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('first element child: ' + this.jsutils.traceElementName(element));
     while (!this.jsutils.isNodeNamedNS(element, 'http://schemas.xmlsoap.org/soap/envelope/', 'Body')) {
      element = this.jsutils.getNextElementSibling(element);
      if (element == null) {
       throw 'No env:Body in message.'
      }
     }
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('part element: ' + this.jsutils.traceElementName(element));
     this.jsutils.trace('calling servicios_salud_aragon_es__saludarResponse_deserializeResponse');
     responseObject = servicios_salud_aragon_es__saludarResponse_deserializeResponse(this.jsutils, element);
     client.user_onsuccess(responseObject);
    }
}

servicios_salud_aragon_es__IServicioGuiaWS.prototype.saludar_onsuccess = servicios_salud_aragon_es__saludar_op_onsuccess;

function servicios_salud_aragon_es__saludar_op_onerror(client) {
    if (client.user_onerror) {
     var httpStatus;
     var httpStatusText;
     try {
      httpStatus = client.req.status;
      httpStatusText = client.req.statusText;
     } catch(e) {
      httpStatus = -1;
      httpStatusText = 'Error opening connection to server';
     }
     client.user_onerror(httpStatus, httpStatusText);
    }
}

servicios_salud_aragon_es__IServicioGuiaWS.prototype.saludar_onerror = servicios_salud_aragon_es__saludar_op_onerror;

//
// Operation {http://servicios.salud.aragon.es/}saludar
// Wrapped operation.
// parameter arg0
// - simple type {http://www.w3.org/2001/XMLSchema}string//
function servicios_salud_aragon_es__saludar_op(successCallback, errorCallback, arg0) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(1);
    args[0] = arg0;
    xml = this.saludar_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.saludar_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.saludar_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

servicios_salud_aragon_es__IServicioGuiaWS.prototype.saludar = servicios_salud_aragon_es__saludar_op;

function servicios_salud_aragon_es__saludar_serializeInput(cxfjsutils, args) {
    var wrapperObj = new servicios_salud_aragon_es__saludar();
    wrapperObj.setArg0(args[0]);
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://servicios.salud.aragon.es/' ");
    // block for local variables
    {
     xml = xml + wrapperObj.serialize(cxfjsutils, 'jns0:saludar', null);
    }
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

servicios_salud_aragon_es__IServicioGuiaWS.prototype.saludar_serializeInput = servicios_salud_aragon_es__saludar_serializeInput;

function servicios_salud_aragon_es__saludarResponse_deserializeResponse(cxfjsutils, partElement) {
    var returnObject = servicios_salud_aragon_es__saludarResponse_deserialize (cxfjsutils, partElement);

    return returnObject;
}
function servicios_salud_aragon_es__saludarPersonas_op_onsuccess(client, responseXml) {
    if (client.user_onsuccess) {
     var responseObject = null;
     var element = responseXml.documentElement;
     this.jsutils.trace('responseXml: ' + this.jsutils.traceElementName(element));
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('first element child: ' + this.jsutils.traceElementName(element));
     while (!this.jsutils.isNodeNamedNS(element, 'http://schemas.xmlsoap.org/soap/envelope/', 'Body')) {
      element = this.jsutils.getNextElementSibling(element);
      if (element == null) {
       throw 'No env:Body in message.'
      }
     }
     element = this.jsutils.getFirstElementChild(element);
     this.jsutils.trace('part element: ' + this.jsutils.traceElementName(element));
     this.jsutils.trace('calling servicios_salud_aragon_es__saludarPersonasResponse_deserializeResponse');
     responseObject = servicios_salud_aragon_es__saludarPersonasResponse_deserializeResponse(this.jsutils, element);
     client.user_onsuccess(responseObject);
    }
}

servicios_salud_aragon_es__IServicioGuiaWS.prototype.saludarPersonas_onsuccess = servicios_salud_aragon_es__saludarPersonas_op_onsuccess;

function servicios_salud_aragon_es__saludarPersonas_op_onerror(client) {
    if (client.user_onerror) {
     var httpStatus;
     var httpStatusText;
     try {
      httpStatus = client.req.status;
      httpStatusText = client.req.statusText;
     } catch(e) {
      httpStatus = -1;
      httpStatusText = 'Error opening connection to server';
     }
     client.user_onerror(httpStatus, httpStatusText);
    }
}

servicios_salud_aragon_es__IServicioGuiaWS.prototype.saludarPersonas_onerror = servicios_salud_aragon_es__saludarPersonas_op_onerror;

//
// Operation {http://servicios.salud.aragon.es/}saludarPersonas
// Wrapped operation.
// parameter arg0
// - array
// - Object constructor is servicios_salud_aragon_es__personaBean
//
function servicios_salud_aragon_es__saludarPersonas_op(successCallback, errorCallback, arg0) {
    this.client = new CxfApacheOrgClient(this.jsutils);
    var xml = null;
    var args = new Array(1);
    args[0] = arg0;
    xml = this.saludarPersonas_serializeInput(this.jsutils, args);
    this.client.user_onsuccess = successCallback;
    this.client.user_onerror = errorCallback;
    var closureThis = this;
    this.client.onsuccess = function(client, responseXml) { closureThis.saludarPersonas_onsuccess(client, responseXml); };
    this.client.onerror = function(client) { closureThis.saludarPersonas_onerror(client); };
    var requestHeaders = [];
    requestHeaders['SOAPAction'] = '';
    this.jsutils.trace('synchronous = ' + this.synchronous);
    this.client.request(this.url, xml, null, this.synchronous, requestHeaders);
}

servicios_salud_aragon_es__IServicioGuiaWS.prototype.saludarPersonas = servicios_salud_aragon_es__saludarPersonas_op;

function servicios_salud_aragon_es__saludarPersonas_serializeInput(cxfjsutils, args) {
    var wrapperObj = new servicios_salud_aragon_es__saludarPersonas();
    wrapperObj.setArg0(args[0]);
    var xml;
    xml = cxfjsutils.beginSoap11Message("xmlns:jns0='http://servicios.salud.aragon.es/' ");
    // block for local variables
    {
     xml = xml + wrapperObj.serialize(cxfjsutils, 'jns0:saludarPersonas', null);
    }
    xml = xml + cxfjsutils.endSoap11Message();
    return xml;
}

servicios_salud_aragon_es__IServicioGuiaWS.prototype.saludarPersonas_serializeInput = servicios_salud_aragon_es__saludarPersonas_serializeInput;

function servicios_salud_aragon_es__saludarPersonasResponse_deserializeResponse(cxfjsutils, partElement) {
    var returnObject = servicios_salud_aragon_es__saludarPersonasResponse_deserialize (cxfjsutils, partElement);

    return returnObject;
}
function servicios_salud_aragon_es__IServicioGuiaWS_servicios_salud_aragon_es__IServicioGuiaWSPort () {
  this.url = 'null';
}
servicios_salud_aragon_es__IServicioGuiaWS_servicios_salud_aragon_es__IServicioGuiaWSPort.prototype = new servicios_salud_aragon_es__IServicioGuiaWS;
