function D6ToStr(y,m,d,h,i,s){
if(m < 10)m = '0' + m;
if(d < 10)d = '0' + d;
if(h < 10)h = '0' + h;
if(i < 10)i = '0' + i;
if(s < 10)s = '0' + s;
return y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s;
}

function D6ToDate(y,m,d,h,i,s){
return new Date(y,m - 1,d,h,i,s,0);	
}

function DateToD6(date){
let y = date.getFullYear();
let m = date.getMonth();
let d = date.getDate();
let h = date.getHours();
let i = date.getMinutes();
let s = date.getSeconds();
return {y:y,m:m + 1,d:d,h:h,i:i,s:s};
}

function DateToStr(date){
let d6 = DateToD6(date);
return D6ToStr(d6.y,d6.m,d6.d,d6.h,d6.i,d6.s);
}

function DaysInMonth(year,month){
return new Date(year, month, 0).getDate();
}

function StrToDate(v){
let y = parseInt(v.substring(0,4),10);	
let m = parseInt(v.substring(5,7),10);	
let d = parseInt(v.substring(8,10),10);
let h = parseInt(v.substring(11,13),10);
let i = parseInt(v.substring(14,16),10);
let s = parseInt(v.substring(17,19),10);
return D6ToDate(y,m,d,h,i,s);
}

(function($){
$.fn.jsRapDateTimePicker = function(options){
	
return this.each(function(){
	let d = new Date();
	this.opt = $.extend({
		date:d,
		yearBefore:5,
		yearAfter:5,
		captions:['Year','Month','Day','Hour','Minute','Second'],
		yearsNames:[],
		monthsNames:['January', 'February', 'March', 'April', 'May', 'Jun', 'July', 'August', 'September', 'October', 'November', 'December'],
		daysNames:[],
		hoursNames:[],
		minutesNames:[],
		secondsNames:[],
		change:false,
		onChange:null
	},options);
	let base = this;
	$(this).addClass('jsRapDateTimePicker');
	let d6 = DateToD6(this.opt.date);
	if(!this.opt.yearsNames.length){
		for(let n = d6.y - this.opt.yearBefore;n <= d6.y + this.opt.yearAfter;n++)
			this.opt.yearsNames.push(n);
	}
	if(!this.opt.monthsNames.length){
		for(let n = 1;n < 13;n++)
			this.opt.monthsNames.push(n);
	}
	if(!this.opt.hoursNames.length){
		for(let n = 0;n < 24;n++)
			this.opt.hoursNames.push(n);
	}
	if(!this.opt.minutesNames.length){
		for(let n = 0;n < 60;n++)
			this.opt.minutesNames.push(n);
	}
	if(!this.opt.secondsNames.length){
		for(let n = 0;n < 60;n++)
			this.opt.secondsNames.push(n);
	}
	let table = $('<table>').appendTo(this);
	let thead = $('<thead>').appendTo(table);
	let tbody = $('<tbody>').appendTo(table);
	let headTr = $('<tr>').appendTo(thead);
	let bodyTr = $('<tr>').appendTo(tbody);
	let caption = this.opt.captions[0];
	if(caption){
		$('<th>').text(caption).appendTo(headTr);
		let td = $('<td>').appendTo(bodyTr);
		let sel = $('<select>').addClass('rdtpYear').appendTo(td);
		for(let n = 0;n < this.opt.yearsNames.length;n++)
			$('<option>').text(this.opt.yearsNames[n]).appendTo(sel);
		$('option',sel).filter(function () { return $(this).html() == d6.y;}).prop( 'selected', true );
	}
	caption = this.opt.captions[1];
	if(caption){
		$('<th>').text(caption).appendTo(headTr);
		let td = $('<td>').appendTo(bodyTr);
		let sel = $('<select>').addClass('rdtpMonth').appendTo(td);
		for(let n = 0;n < this.opt.monthsNames.length;n++)
			$('<option>').text(this.opt.monthsNames[n]).appendTo(sel);
		$('option',sel).filter(function () { return $(this).html() == base.opt.monthsNames[d6.m - 1];}).prop( 'selected', true );
	}
	caption = this.opt.captions[2];
	if(caption){
		$('<th>').text(caption).appendTo(headTr);
		let td = $('<td>').appendTo(bodyTr);
		let sel = $('<select>').addClass('rdtpDay').appendTo(td);
	}
	caption = this.opt.captions[3];
	if(caption){
		$('<th>').text(caption).appendTo(headTr);
		let td = $('<td>').appendTo(bodyTr);
		let sel = $('<select>').addClass('rdtpHour').appendTo(td);
		for(let n = 0;n < this.opt.hoursNames.length;n++)
			$('<option>').text(this.opt.hoursNames[n]).appendTo(sel);
		$('option',sel).filter(function () { return $(this).html() == d6.h;}).prop( 'selected', true );
	}
	caption = this.opt.captions[4];
	if(caption){
		$('<th>').text(caption).appendTo(headTr);
		let td = $('<td>').appendTo(bodyTr);
		let sel = $('<select>').addClass('rdtpMinute').appendTo(td);
		for(let n = 0;n < this.opt.minutesNames.length;n++)
			$('<option>').text(this.opt.minutesNames[n]).appendTo(sel);
		$('option',sel).filter(function () { return $(this).html() == d6.i;}).prop( 'selected', true );
	}
	caption = this.opt.captions[5];
	if(caption){
		$('<th>').text(caption).appendTo(headTr);
		let td = $('<td>').appendTo(bodyTr);
		let sel = $('<select>').addClass('rdtpSecond').appendTo(td);
		for(let n = 0;n < this.opt.secondsNames.length;n++)
			$('<option>').text(this.opt.secondsNames[n]).appendTo(sel);
		$('option',sel).filter(function () { return $(this).html() == d6.s;}).prop( 'selected', true );
	}
	
	$('select',this).bind({
			change:function(e){
				d6.y = $('.rdtpYear option:selected',base).text();
				d6.m = $('.rdtpMonth option:selected',base).index() + 1;
				d6.d = $('.rdtpDay option:selected',base).text();
				d6.h = $('.rdtpHour option:selected',base).text();
				d6.i = $('.rdtpMinute option:selected',base).text();
				d6.s = $('.rdtpSecond option:selected',base).text();
				base.SetD6(true,d6.y,d6.m,d6.d,d6.h,d6.i,d6.s);
			}
	});
	
	this.SetD6 = function(change,y,m,d,h,i,s){
		let dim = DaysInMonth(y,m + 1);
		let day = $('.rdtpDay',base).empty();
		for(let n = 1;n <= dim;n++)
			$('<option>').text(n).appendTo(day);
		$('option',day).filter(function () { return $(this).html() == d6.d;}).prop( 'selected', true );
		if(base.opt.onChange && change)
			base.opt.onChange.call(this,d6.y,d6.m,d6.d,d6.h,d6.i,d6.s);
	}
	
	this.SetD6(base.opt.change,d6.y,d6.m,d6.d,d6.h,d6.i,d6.s);
	
})

}})(jQuery);